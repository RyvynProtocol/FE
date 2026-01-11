import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { useEffect } from 'react';
import { CONTRACTS } from '@/config/contracts';
import RyUSDABI from '@/abis/RyUSD.json';
import MockUSDCABI from '@/abis/MockUSDC.json';

export function useRyUSD() {
  const { address } = useAccount();
  
  const { data: ryUSDBalance, refetch: refetchRyUSD } = useReadContract({
    address: CONTRACTS.ryUSD as `0x${string}`,
    abi: RyUSDABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: 5003,
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.mockUSDC as `0x${string}`,
    abi: MockUSDCABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.ryUSD] : undefined,
    chainId: 5003,
  });

  const { 
    writeContract: approve, 
    isPending: isApproving,
    data: approveTxHash 
  } = useWriteContract();

  const { 
    writeContract: deposit, 
    isPending: isDepositing,
    data: depositTxHash 
  } = useWriteContract();

  const { 
    writeContract: withdraw, 
    isPending: isWithdrawing,
    data: withdrawTxHash 
  } = useWriteContract();

  const { isLoading: isApprovingConfirm, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  });

  const { isLoading: isDepositingConfirm, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({
    hash: depositTxHash,
  });

  const { isLoading: isWithdrawingConfirm, isSuccess: isWithdrawSuccess } = useWaitForTransactionReceipt({
    hash: withdrawTxHash,
  });

  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance();
    }
  }, [isApproveSuccess, refetchAllowance]);

  useEffect(() => {
    if (isDepositSuccess) {
      refetchRyUSD();
      refetchAllowance();
    }
  }, [isDepositSuccess, refetchRyUSD, refetchAllowance]);

  useEffect(() => {
    if (isWithdrawSuccess) {
      refetchRyUSD();
      refetchAllowance();
    }
  }, [isWithdrawSuccess, refetchRyUSD, refetchAllowance]);

  const approveUSDC = (amount: string) => {
    approve({
      address: CONTRACTS.mockUSDC as `0x${string}`,
      abi: MockUSDCABI,
      functionName: 'approve',
      args: [CONTRACTS.ryUSD, parseUnits(amount, 6)],
      chainId: 5003,
    });
  };

  const mintRyUSD = (amount: string) => {
    deposit({
      address: CONTRACTS.ryUSD as `0x${string}`,
      abi: RyUSDABI,
      functionName: 'deposit',
      args: [parseUnits(amount, 6)],
      chainId: 5003,
    });
  };

  const withdrawRyUSD = (amount: string) => {
    withdraw({
      address: CONTRACTS.ryUSD as `0x${string}`,
      abi: RyUSDABI,
      functionName: 'withdraw',
      args: [parseUnits(amount, 6)],
      chainId: 5003,
    });
  };

  return {
    ryUSDBalance,
    allowance,
    approveUSDC,
    mintRyUSD,
    withdrawRyUSD,
    isApproving: isApproving || isApprovingConfirm,
    isDepositing: isDepositing || isDepositingConfirm,
    isWithdrawing: isWithdrawing || isWithdrawingConfirm,
  };
}