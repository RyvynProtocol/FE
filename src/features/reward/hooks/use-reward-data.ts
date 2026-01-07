import { useEffect, useState } from 'react';

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

// --- Mock Data ---

const MOCK_STREAM: RewardStream = {
  claimableBalance: 45.2190,
  earningsRateApy: 5.2,
  flowRatePerSecond: 0.00012, // ~$10/day
  lastUpdated: Date.now(),
  isStreaming: true,
};

// --- Hook ---

export function useRewardData(): UseRewardDataReturn {
  const [stream, setStream] = useState<RewardStream>(MOCK_STREAM);
  const [claimTx, setClaimTx] = useState<ClaimTransaction>({ status: 'idle' });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock Streaming Logic
  useEffect(() => {
    if (isLoading || !stream.isStreaming) return;

    // Use a fast interval for smooth-ish updates, or 1s as per spec requirement (SC-001)
    // Spec says "updates visually every 1 second".
    const interval = setInterval(() => {
      setStream((prev) => ({
        ...prev,
        claimableBalance: prev.claimableBalance + prev.flowRatePerSecond,
        lastUpdated: Date.now(),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, stream.isStreaming]);

  const claimReward = async () => {
    if (claimTx.status === 'pending') return;

    setClaimTx({ status: 'pending' });

    // Mock Transaction Delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success State
    setClaimTx({
      status: 'success',
      txHash: '0xmock...hash',
      amountClaimed: stream.claimableBalance,
      timestamp: Date.now(),
    });

    // Reset Balance
    setStream((prev) => ({
      ...prev,
      claimableBalance: 0,
    }));

    // Reset to Idle after a delay? Or let the UI handle it?
    // Let's keep it success so UI can show "Claimed!"
    setTimeout(() => {
        setClaimTx({ status: 'idle' });
    }, 5000);
  };

  return {
    stream,
    claimTx,
    claimReward,
    isLoading,
  };
}
