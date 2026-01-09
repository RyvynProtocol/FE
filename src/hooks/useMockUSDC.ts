import { CONTRACTS } from '@/config/contracts';
import { useAccount, useReadContract, useWriteContract, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi';
import MockUSDCABI from '@/abis/MockUSDC.json';
import { parseUnits } from 'viem';
import { useEffect } from 'react';

export function useMockUSDC() {
  const { address, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const { data: balance, refetch } = useReadContract({
    address: CONTRACTS.mockUSDC as `0x${string}`,
    abi: MockUSDCABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: 5003,
  });

  const { 
    writeContract: mintPublic, 
    isPending: isSubmitting,
    data: txHash 
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const { writeContract: mintAdmin, isPending: isMintingAdmin } = useWriteContract();

  const claimFaucet = async (amount: string) => {
    if (!address) return;
    
    if (chain?.id !== 5003) {
      try {
        await switchChainAsync({ chainId: 5003 });
      } catch (error) {
        console.error('Failed to switch network:', error);
        return;
      }
    }
    
    mintPublic({
      address: CONTRACTS.mockUSDC as `0x${string}`,
      abi: MockUSDCABI,
      functionName: 'mintPublic',
      args: [address, parseUnits(amount, 6)],
    });
  };

  const adminMint = async (recipient: string, amount: string) => {
    if (chain?.id !== 5003) {
      try {
        await switchChainAsync({ chainId: 5003 });
      } catch (error) {
        console.error('Failed to switch network:', error);
        return;
      }
    }

    mintAdmin({
      address: CONTRACTS.mockUSDC as `0x${string}`,
      abi: MockUSDCABI,
      functionName: 'mintAdmin',
      args: [recipient as `0x${string}`, parseUnits(amount, 6)],
    });
  };

  return {
    balance,
    claimFaucet,
    adminMint,
    isMintingPublic: isSubmitting || isConfirming,
    isMintingAdmin,
    refetch,
  };
}