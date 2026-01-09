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
        {/* Left Column: Balance & Hero Text */}
        <div className="relative flex flex-col">
          {/* Pending Yield - Centered */}
          <div className="flex flex-1 items-center pt-16">
            <ClaimableBalanceTicker
              balance={stream.claimableBalance}
              earningsRateApy={stream.earningsRateApy}
              flowRatePerSecond={stream.flowRatePerSecond}
            />
          </div>

          {/* Hero Text - Bottom Left */}
          <div className="space-y-6 pb-3">
            <h1 className="text-5xl font-bold tracking-tight uppercase sm:text-6xl lg:text-7xl">
              CLAIM YOUR{' '}
              <span className="text-muted-foreground">REAL-WORLD YIELD.</span>
            </h1>
            <p className="text-muted-foreground max-w-lg text-lg">
              Your assets are generating yield in real-time. Claim your pending
              rewards instantly to your wallet.
            </p>
          </div>
        </div>

        {/* Right Column: Claim Card */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Shadow Box */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg bg-[#B5A48F]" />
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
