import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACTS } from '@/config/contracts';
import RyBONDABI from '@/abis/RyBOND.json';
import { toast } from 'sonner';

// --- Types ---

export type RewardStream = {
  claimableBalance: number;   // Current available USD value
  earningsRateApy: number;    // Static APY
  flowRatePerSecond: number;  // USD earning per second
  lastUpdated: number;        // Timestamp
  isStreaming: boolean;       // Active state
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
  const { address } = useAccount();
  const [stream, setStream] = useState<RewardStream>({
    claimableBalance: 0,
    earningsRateApy: 0,
    flowRatePerSecond: 0,
    lastUpdated: Date.now(),
    isStreaming: true,
  });
  const [claimTx, setClaimTx] = useState<ClaimTransaction>({ status: 'idle' });

  // Read pending ryBOND balance (includes accrued yield)
  const { data: pendingBalance, refetch: refetchPending, isLoading: isLoadingBalance, error: balanceError } = useReadContract({
    address: CONTRACTS.ryBOND as `0x${string}`,
    abi: RyBONDABI,
    functionName: 'pendingRyBond',
    args: address ? [address] : undefined,
    chainId: 5003,
    query: {
      enabled: !!address,
      // Remove refetchInterval - we'll handle streaming on client side
    }
  });

  // Debug logging
  console.log('=== ryBOND Read Debug ===');
  console.log('Wallet Address:', address);
  console.log('ryBOND Contract:', CONTRACTS.ryBOND);
  console.log('isLoadingBalance:', isLoadingBalance);
  console.log('balanceError:', balanceError);
  console.log('pendingBalance:', pendingBalance);

  // Read yield rate per second
  const { data: yieldRate } = useReadContract({
    address: CONTRACTS.ryBOND as `0x${string}`,
    abi: RyBONDABI,
    functionName: 'yieldRatePerSecond',
    chainId: 5003,
  });

  // Claim function
  const {
    writeContract: claim,
    isPending: isClaiming,
    data: claimTxHash
  } = useWriteContract();

  const { isLoading: isClaimConfirming, isSuccess: isClaimSuccess } = useWaitForTransactionReceipt({
    hash: claimTxHash,
  });

  // Update stream state when balance changes from contract
  useEffect(() => {
    if (pendingBalance !== undefined) {
      const balance = Number(formatUnits(pendingBalance as bigint, 6));
      const flowRate = yieldRate
        ? Number(formatUnits((yieldRate as bigint), 18))
        : 0;

      console.log('=== ryBOND Balance Update ===');
      console.log('Address:', address);
      console.log('Contract:', CONTRACTS.ryBOND);
      console.log('Raw pendingBalance:', pendingBalance?.toString());
      console.log('Formatted balance:', balance);
      console.log('Raw yieldRate:', yieldRate?.toString());
      console.log('Formatted flowRate:', flowRate);

      // Calculate APY from yield rate
      // yieldRate is per second, so: APY = flowRate * 365 * 24 * 60 * 60 / balance * 100
      const apy = balance > 0 && flowRate > 0
        ? (flowRate * 31536000 / balance) * 100
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
    if (!stream.isStreaming || stream.flowRatePerSecond <= 0) return;

    const interval = setInterval(() => {
      setStream((prev) => ({
        ...prev,
        claimableBalance: prev.claimableBalance + prev.flowRatePerSecond,
        lastUpdated: Date.now(),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [stream.isStreaming, stream.flowRatePerSecond]);

  // Handle claim success
  useEffect(() => {
    if (isClaimSuccess && claimTxHash) {
      setClaimTx({
        status: 'success',
        txHash: claimTxHash,
        amountClaimed: stream.claimableBalance,
        timestamp: Date.now(),
      });

      toast.success('Rewards claimed successfully!');
      refetchPending();

      // Reset to idle after 5 seconds
      setTimeout(() => {
        setClaimTx({ status: 'idle' });
      }, 5000);
    }
  }, [isClaimSuccess, claimTxHash, stream.claimableBalance, refetchPending]);

  // Handle claim pending
  useEffect(() => {
    if (isClaiming || isClaimConfirming) {
      setClaimTx({ status: 'pending' });
    }
  }, [isClaiming, isClaimConfirming]);

  const claimReward = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    if (claimTx.status === 'pending') return;

    if (stream.claimableBalance <= 0) {
      toast.error('No rewards to claim');
      return;
    }

    try {
      toast.info('Claiming rewards...');
      claim({
        address: CONTRACTS.ryBOND as `0x${string}`,
        abi: RyBONDABI,
        functionName: 'claim',
        chainId: 5003,
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
