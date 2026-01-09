import MockUSDCABI from '@/abis/MockUSDC.json';
import { CONTRACTS } from '@/config/contracts';
import { useEffect } from 'react';
import { parseUnits } from 'viem';
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

export function useMockUSDC() {
  const { address, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const {
    data: balance,
    refetch,
    isLoading,
    error,
  } = useReadContract({
    address: CONTRACTS.mockUSDC as `0x${string}`,
    abi: MockUSDCABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: 5003,
  });

  console.log(
    '💰 Balance data:',
    balance,
    'isLoading:',
    isLoading,
    'error:',
    error
  );

  const {
    writeContract: mintPublic,
    isPending: isSubmitting,
    data: txHash,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const { writeContract: mintAdmin, isPending: isMintingAdmin } =
    useWriteContract();

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
