import RyvynHandlerABI from '@/abis/RyvynHandler.json';
import { CONTRACTS } from '@/config/contracts';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export function useRyvynHandler() {
  const {
    writeContract: forceUpdate,
    isPending: isUpdating,
    data: updateTxHash,
  } = useWriteContract();

  const { isLoading: isUpdateConfirming } = useWaitForTransactionReceipt({
    hash: updateTxHash,
  });

  const forceUpdateBucketStatuses = (userAddress: string) => {
    forceUpdate({
      address: CONTRACTS.ryvynHandler as `0x${string}`,
      abi: RyvynHandlerABI,
      functionName: 'forceUpdateBucketStatuses',
      args: [userAddress as `0x${string}`],
      chainId: 5003,
    });
  };

  return {
    forceUpdateBucketStatuses,
    isUpdating: isUpdating || isUpdateConfirming,
  };
}
