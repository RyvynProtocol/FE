import RyBONDABI from '@/abis/RyBOND.json';
import { CONTRACTS } from '@/config/contracts';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { formatUnits } from 'viem';
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

// --- Types ---

export type RewardStream = {
  claimableBalance: number; // Current available USD value
  earningsRateApy: number; // Static APY
  flowRatePerSecond: number; // USD earning per second
  lastUpdated: number; // Timestamp
  isStreaming: boolean; // Active state
};

export type ClaimTransaction = {
  status: 'idle' | 'pending' | 'success' | 'error';
  txHash?: string;
  amountClaimed?: number;
  timestamp?: number;
};

export interface UseRewardDataReturn {
  stream: RewardStream;
  claimTx: ClaimTransaction;
  claimReward: () => Promise<void>;
  isLoading: boolean;
}

// --- Hook ---

export function useRewardData(): UseRewardDataReturn {
  const { address, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [stream, setStream] = useState<RewardStream>({
    claimableBalance: 0,
    earningsRateApy: 0,
    flowRatePerSecond: 0,
    lastUpdated: Date.now(),
    isStreaming: true,
  });
  const [claimTx, setClaimTx] = useState<ClaimTransaction>({ status: 'idle' });
  const hasShownSuccessToast = useRef(false);

  const {
    data: pendingBalance,
    refetch: refetchPending,
    isLoading: isLoadingBalance,
    error: balanceError,
  } = useReadContract({
    address: CONTRACTS.ryBOND as `0x${string}`,
    abi: RyBONDABI,
    functionName: 'pendingRyBond',
    args: address ? [address] : undefined,
    chainId: 5003,
    query: {
      enabled: !!address,
    },
  });

  // Read yield rate per second
  const { data: yieldRate } = useReadContract({
    address: CONTRACTS.ryBOND as `0x${string}`,
    abi: RyBONDABI,
    functionName: 'yieldRatePerSecond',
    chainId: 5003,
  });

  // Read vault address from ryBOND contract
  const { data: vaultAddress } = useReadContract({
    address: CONTRACTS.ryBOND as `0x${string}`,
    abi: RyBONDABI,
    functionName: 'vault',
    chainId: 5003,
  });

  // Claim function
  const {
    writeContract: claim,
    isPending: isClaiming,
    data: claimTxHash,
    error: claimError,
  } = useWriteContract();

  const {
    isLoading: isClaimConfirming,
    isSuccess: isClaimSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: claimTxHash,
  });

  // Update stream state when balance changes from contract
  useEffect(() => {
    if (pendingBalance !== undefined) {
      const balance = Number(formatUnits(pendingBalance as bigint, 6));
      const flowRate = yieldRate
        ? Number(formatUnits(yieldRate as bigint, 18))
        : 0;

      // Calculate APY from yield rate
      // yieldRate is per second, so: APY = flowRate * 365 * 24 * 60 * 60 / balance * 100
      const apy =
        balance > 0 && flowRate > 0
          ? ((flowRate * 31536000) / balance) * 100
          : 0;

      setStream({
        claimableBalance: balance,
        earningsRateApy: apy,
        flowRatePerSecond: flowRate,
        lastUpdated: Date.now(),
        isStreaming: balance > 0,
      });
    }
  }, [pendingBalance, yieldRate, address]);

  // Client-side streaming: update balance every second based on flow rate
  useEffect(() => {
    if (
      !stream.isStreaming ||
      stream.flowRatePerSecond <= 0 ||
      stream.claimableBalance <= 0
    )
      return;

    const interval = setInterval(() => {
      setStream(prev => {
        // Don't increment if balance is already 0 (after claim)
        if (prev.claimableBalance <= 0) return prev;

        return {
          ...prev,
          claimableBalance: prev.claimableBalance + prev.flowRatePerSecond,
          lastUpdated: Date.now(),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stream.isStreaming, stream.flowRatePerSecond, stream.claimableBalance]);

  // Handle claim success
  useEffect(() => {
    if (isClaimSuccess && claimTxHash && !hasShownSuccessToast.current) {
      hasShownSuccessToast.current = true;

      const claimedAmount = stream.claimableBalance;

      setClaimTx({
        status: 'success',
        txHash: claimTxHash,
        amountClaimed: claimedAmount,
        timestamp: Date.now(),
      });

      // Immediately reset balance to 0 after claim
      setStream(prev => ({
        ...prev,
        claimableBalance: 0,
        isStreaming: false, // Stop streaming temporarily
        lastUpdated: Date.now(),
      }));

      toast.success('ryUSD claimed successfully! Check your wallet.');

      // Refetch to get accurate balance from blockchain
      refetchPending();

      // Reset to idle after 5 seconds and resume streaming
      setTimeout(() => {
        setClaimTx({ status: 'idle' });
        hasShownSuccessToast.current = false; // Reset for next claim

        // Resume streaming if there's any new balance
        setStream(prev => ({
          ...prev,
          isStreaming: prev.claimableBalance > 0,
        }));
      }, 5000);
    }
  }, [isClaimSuccess, claimTxHash, stream.claimableBalance, refetchPending]);

  // Handle claim pending
  useEffect(() => {
    if (isClaiming || isClaimConfirming) {
      setClaimTx({ status: 'pending' });
    }
  }, [isClaiming, isClaimConfirming]);

  // Handle claim errors
  useEffect(() => {
    if (claimError || receiptError) {
      const error = claimError || receiptError;
      const errorMessage = error?.message || 'Claim failed';

      console.error('Claim error:', error);

      // Check for specific error types
      if (errorMessage.includes('out of gas')) {
        toast.error(
          'Claim failed: Vault may not have sufficient ryUSD. Please contact admin.'
        );
      } else if (errorMessage.includes('nothing to claim')) {
        toast.error('No rewards available to claim');
      } else if (errorMessage.includes('insufficient balance')) {
        toast.error('Vault has insufficient balance. Please try again later.');
      } else {
        toast.error('Claim failed. Please try again or contact support.');
      }

      setClaimTx({ status: 'error' });

      setTimeout(() => {
        setClaimTx({ status: 'idle' });
      }, 3000);
    }
  }, [claimError, receiptError]);

  const claimReward = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (claimTx.status === 'pending') {
      toast.info('Transaction already in progress. Please wait...');
      return;
    }

    if (stream.claimableBalance <= 0) {
      toast.error('No rewards to claim');
      return;
    }

    if (chain?.id !== 5003) {
      try {
        await switchChainAsync({ chainId: 5003 });
      } catch (error) {
        console.error('Failed to switch network:', error);
        toast.error('Failed to switch network. Please switch manually.');
        return;
      }
    }

    try {
      toast.info('Initiating claim transaction...');
      claim({
        address: CONTRACTS.ryBOND as `0x${string}`,
        abi: RyBONDABI,
        functionName: 'claim',
        chainId: 5003,
        // Let wagmi estimate gas automatically instead of manually setting it
      });
    } catch (error) {
      console.error('Claim failed:', error);
      toast.error('Claim failed. Please try again.');
      setClaimTx({ status: 'error' });
      setTimeout(() => {
        setClaimTx({ status: 'idle' });
      }, 3000);
    }
  };

  return {
    stream,
    claimTx,
    claimReward,
    isLoading: isLoadingBalance,
  };
}
