import { useEffect, useState } from 'react';

// --- Types ---

export type TreasuryAsset = {
  id: string;
  name: string;
  description: string;
  allocation: number; // Percentage (0-100)
  value: number; // USD Value
  apy: number; // Annual Percentage Yield
  verificationLink?: string; // URL to Etherscan/Ondo
  colorVar: string; // CSS variable for chart
};

export type LiquidityState = {
  hotWallet: {
    value: number;
    threshold: number; // 5% of TVL
    status: 'healthy' | 'warning' | 'critical';
  };
  lendingStrategy: {
    value: number;
    protocol: string;
  };
  totalTvl: number;
};

export type YieldMetrics = {
  unallocatedPool: number;
  currentApy: number;
  yieldPerSecond: number;
  lastUpdated: number;
};

export interface UseTreasuryDataReturn {
  assets: TreasuryAsset[];
  liquidity: LiquidityState;
  yieldMetrics: YieldMetrics;
  isLoading: boolean;
}

// --- Mock Data ---

const MOCK_ASSETS: TreasuryAsset[] = [
  {
    id: 'usdy',
    name: 'Ondo USDY',
    description: 'Short-term US Treasuries',
    allocation: 40,
    value: 4080000,
    apy: 5.1,
    verificationLink: 'https://ondo.finance/usdy',
    colorVar: 'var(--chart-1)',
  },
  {
    id: 'ousg',
    name: 'Ondo OUSG',
    description: 'US Treasury Bond ETF',
    allocation: 35,
    value: 3570000,
    apy: 4.8,
    verificationLink: 'https://ondo.finance/ousg',
    colorVar: 'var(--chart-2)',
  },
  {
    id: 'buffer',
    name: 'USDC Liquid Buffer',
    description: 'Immediate Liquidity',
    allocation: 20,
    value: 2040000,
    apy: 3.2,
    colorVar: 'var(--chart-3)',
  },
  {
    id: 'reserve',
    name: 'Protocol Reserve',
    description: 'Safety Module',
    allocation: 5,
    value: 510000,
    apy: 0,
    colorVar: 'var(--chart-4)',
  },
];

const INITIAL_YIELD_METRICS: YieldMetrics = {
  unallocatedPool: 12500.0,
  currentApy: 5.0,
  yieldPerSecond: 0.05, // ~$4320/day
  lastUpdated: Date.now(),
};

// --- Hook ---

export function useTreasuryData(): UseTreasuryDataReturn {
  const [assets] = useState<TreasuryAsset[]>(MOCK_ASSETS);
  const [yieldMetrics, setYieldMetrics] = useState<YieldMetrics>(
    INITIAL_YIELD_METRICS
  );
  const [isLoading, setIsLoading] = useState(true);

  // Calculate Liquidity State derived from Assets
  const bufferAsset = assets.find((a) => a.id === 'buffer');
  const hotWalletValue = bufferAsset ? bufferAsset.value : 0;
  
  // Assume Lending Strategy is the rest of the productive assets (USDY + OUSG + Corp Bonds if any)
  // For simplicity, let's say Lending Strategy = USDY + OUSG
  const lendingValue = assets
    .filter((a) => ['usdy', 'ousg'].includes(a.id))
    .reduce((sum, a) => sum + a.value, 0);

  const totalTvl = assets.reduce((sum, a) => sum + a.value, 0);
  const hotWalletRatio = totalTvl > 0 ? hotWalletValue / totalTvl : 0;

  const liquidity: LiquidityState = {
    hotWallet: {
      value: hotWalletValue,
      threshold: 0.05,
      status: hotWalletRatio < 0.05 ? 'warning' : 'healthy',
    },
    lendingStrategy: {
      value: lendingValue,
      protocol: 'Ondo Finance',
    },
    totalTvl,
  };

  useEffect(() => {
    // Simulate initial fetch delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Mock Streaming
    const interval = setInterval(() => {
      setYieldMetrics((prev) => ({
        ...prev,
        unallocatedPool: prev.unallocatedPool + prev.yieldPerSecond,
        lastUpdated: Date.now(),
      }));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [isLoading]);

  return {
    assets,
    liquidity,
    yieldMetrics,
    isLoading,
  };
}
