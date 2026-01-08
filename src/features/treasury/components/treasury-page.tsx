'use client';

import { PageContainer } from '@/components/page-container';
import { Skeleton } from '@/components/ui/skeleton';
import { useTreasuryData } from '../hooks/use-treasury-data';
import AssetAllocationChart from './asset-allocation-chart';
import TreasuryStatsCard from './treasury-stats-card';
import YieldBudgetWidget from './yield-budget-widget';

export default function TreasuryPage() {
  const { assets, liquidity, yieldMetrics, isLoading } = useTreasuryData();

  if (isLoading) {
    return (
      <PageContainer>
        {/* Top Section Skeleton */}
        <div className="grid min-h-[calc(100vh-200px)] grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-end py-8">
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-16 w-1/2" />
              <Skeleton className="mt-6 h-8 w-2/3" />
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex items-center justify-center p-6 lg:justify-end">
              <Skeleton className="h-[500px] w-[500px] rounded-full" />
            </div>
          </div>
        </div>

        {/* Second Section Skeleton */}
        <div className="py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Top Section: Big Text & Chart */}
      <div className="grid min-h-[calc(100vh-200px)] grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column: Header & Big Text */}
        <div className="flex flex-col justify-end py-8">
          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              TRANSPARENCY <br className="hidden md:block" />
              <span className="text-muted-foreground">BUILDS TRUST.</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-lg font-medium md:text-xl">
              Verifiable on-chain assets backing every ryUSD in circulation.
            </p>
          </div>
        </div>

        {/* Right Column: Chart Only (Bottom Alignment) */}
        <div className="flex flex-col justify-end">
          <div className="flex items-center justify-center p-6 lg:justify-end">
            <div className="w-full max-w-xl">
              <AssetAllocationChart assets={assets} />
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Yield Streaming */}
          <YieldBudgetWidget metrics={yieldMetrics} />

          {/* Right: Stats Card */}
          <div className="lg:h-full">
            <TreasuryStatsCard
              liquidity={liquidity}
              yieldMetrics={yieldMetrics}
              assets={assets}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
