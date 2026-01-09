import TreasuryManagerABI from '@/abis/TreasuryManager.json';
import { CONTRACTS } from '@/config/contracts';
import { parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export function useTreasuryManager() {
  const {
    writeContract: harvest,
    isPending: isHarvesting,
    data: harvestTxHash,
  } = useWriteContract();

  const {
    writeContract: allocateFunds,
    isPending: isAllocating,
    data: allocateTxHash,
  } = useWriteContract();

  const {
    writeContract: refill,
    isPending: isRefilling,
    data: refillTxHash,
  } = useWriteContract();

  const { isLoading: isHarvestConfirming } = useWaitForTransactionReceipt({
    hash: harvestTxHash,
  });

  const { isLoading: isAllocateConfirming } = useWaitForTransactionReceipt({
    hash: allocateTxHash,
  });

  const { isLoading: isRefillConfirming } = useWaitForTransactionReceipt({
    hash: refillTxHash,
  });

  const harvestAllYield = () => {
    harvest({
      address: CONTRACTS.treasuryManager as `0x${string}`,
      abi: TreasuryManagerABI,
      functionName: 'harvestAllYield',
      chainId: 5003,
    });
  };

  const allocate = () => {
    allocateFunds({
      address: CONTRACTS.treasuryManager as `0x${string}`,
      abi: TreasuryManagerABI,
      functionName: 'allocate',
      chainId: 5003,
    });
  };

  const refillHotWallet = (amount: string) => {
    refill({
      address: CONTRACTS.treasuryManager as `0x${string}`,
      abi: TreasuryManagerABI,
      functionName: 'refillHotWallet',
      args: [parseUnits(amount, 6)],
      chainId: 5003,
    });
  };

  return {
    harvestAllYield,
    allocate,
    refillHotWallet,
    isHarvesting: isHarvesting || isHarvestConfirming,
    isAllocating: isAllocating || isAllocateConfirming,
    isRefilling: isRefilling || isRefillConfirming,
  };
}
