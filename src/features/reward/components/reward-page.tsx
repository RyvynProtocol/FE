'use client';

import { PageContainer } from '@/components/page-container';
import { Skeleton } from '@/components/ui/skeleton';
import { useRewardData } from '../hooks/use-reward-data';
import ClaimActionCard from './claim-action-card';
import ClaimableBalanceTicker from './claimable-balance-ticker';

export default function RewardDashboard() {
  const { stream, claimTx, claimReward, isLoading } = useRewardData();

  if (isLoading) {
    return (
      <div className="grid min-h-[calc(100vh-200px)] grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="flex items-center justify-center">
          <Skeleton className="h-[400px] w-full max-w-md" />
        </div>
      </div>
    );
  }

  return (
    <PageContainer>
      <div className="grid min-h-[calc(100vh-200px)] grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column: Hero Text & Ticker */}
        <div className="flex flex-col justify-center py-8">
          <div>
            <h1 className="text-primary mb-12 text-2xl font-bold tracking-tighter uppercase sm:text-3xl">
              My Rewards
            </h1>
            <ClaimableBalanceTicker
              balance={stream.claimableBalance}
              earningsRateApy={stream.earningsRateApy}
              flowRatePerSecond={stream.flowRatePerSecond}
            />
            <div className="mt-8 max-w-lg">
              <p className="text-muted-foreground text-lg">
                Your assets are generating yield in real-time. Watch your
                balance grow every second.
              </p>
            </div>
          </div>
        </div>
        {/* Right Column: Action Card */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <ClaimActionCard
              balance={stream.claimableBalance}
              onClaim={claimReward}
              claimTx={claimTx}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
