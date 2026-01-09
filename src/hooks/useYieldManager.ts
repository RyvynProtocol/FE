import YieldManagerABI from '@/abis/YieldManager.json';
import { CONTRACTS } from '@/config/contracts';
import { parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export function useYieldManager() {
  const {
    writeContract: addVolume,
    isPending: isAddingVolume,
    data: addVolumeTxHash,
  } = useWriteContract();

  const {
    writeContract: simulateYield,
    isPending: isSimulatingYield,
    data: simulateYieldTxHash,
  } = useWriteContract();

  const {
    writeContract: recordSnapshot,
    isPending: isRecordingSnapshot,
    data: recordSnapshotTxHash,
  } = useWriteContract();

  const { isLoading: isAddVolumeConfirming } = useWaitForTransactionReceipt({
    hash: addVolumeTxHash,
  });

  const { isLoading: isSimulateYieldConfirming } = useWaitForTransactionReceipt(
    {
      hash: simulateYieldTxHash,
    }
  );

  const { isLoading: isRecordSnapshotConfirming } =
    useWaitForTransactionReceipt({
      hash: recordSnapshotTxHash,
    });

  const addDemoVolume = (amount: string) => {
    addVolume({
      address: CONTRACTS.yieldManager as `0x${string}`,
      abi: YieldManagerABI,
      functionName: 'addDemoVolume',
      args: [parseUnits(amount, 6)],
      chainId: 5003,
    });
  };

  const simulateYieldGeneration = (amount: string) => {
    simulateYield({
      address: CONTRACTS.yieldManager as `0x${string}`,
      abi: YieldManagerABI,
      functionName: 'simulateYieldGeneration',
      args: [parseUnits(amount, 6)],
      chainId: 5003,
    });
  };

  const recordDailySnapshot = () => {
    recordSnapshot({
      address: CONTRACTS.yieldManager as `0x${string}`,
      abi: YieldManagerABI,
      functionName: 'recordDailySnapshot',
      chainId: 5003,
    });
  };

  return {
    addDemoVolume,
    simulateYieldGeneration,
    recordDailySnapshot,
    isAddingVolume: isAddingVolume || isAddVolumeConfirming,
    isSimulatingYield: isSimulatingYield || isSimulateYieldConfirming,
    isRecordingSnapshot: isRecordingSnapshot || isRecordSnapshotConfirming,
  };
}
