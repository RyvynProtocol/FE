import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  DollarSign,
  Droplets,
  PieChart,
  Shield,
  TrendingUp,
} from 'lucide-react';
import {
  LiquidityState,
  TreasuryAsset,
  YieldMetrics,
} from '../hooks/use-treasury-data';

interface TreasuryStatsCardProps {
  liquidity: LiquidityState;
  yieldMetrics: YieldMetrics;
  assets: TreasuryAsset[];
}

export default function TreasuryStatsCard({
  liquidity,
  yieldMetrics,
  assets,
}: TreasuryStatsCardProps) {
  const { hotWallet, lendingStrategy, totalTvl } = liquidity;
  const hotWalletPercent = (hotWallet.value / totalTvl) * 100;
  const lendingPercent = (lendingStrategy.value / totalTvl) * 100;
  const isWarning = hotWallet.status !== 'healthy';
  const progressColorClass = isWarning ? 'bg-amber-500' : 'bg-green-500';

  const formatCompactNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}k`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Treasury Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4" /> Total Value
            </div>
            <p className="text-2xl font-bold">
              {formatCompactNumber(liquidity.totalTvl)}
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" /> Current Yield
            </div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {yieldMetrics.currentApy}%
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <PieChart className="h-4 w-4" /> 7-Day Volume
            </div>
            <p className="text-2xl font-bold">
              ${(yieldMetrics.sevenDayVolume || 0).toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" /> Utilization Rate
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {yieldMetrics.utilizationRate}%
            </p>
          </div>
        </div>

        <Separator />

        {/* Liquidity Monitor Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Droplets className="h-4 w-4 text-blue-500" />
            Liquidity Monitor
          </div>

          {/* Hot Wallet */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                Hot Wallet (Available)
              </span>
              <span className="font-mono">
                {formatCompactNumber(hotWallet.value)}
              </span>
            </div>
            <div className="bg-secondary relative h-2 w-full overflow-hidden rounded-full">
              <div
                className={cn(
                  'h-full w-full flex-1 transition-all',
                  progressColorClass
                )}
                style={{
                  transform: `translateX(-${100 - (hotWalletPercent || 0)}%)`,
                }}
              />
            </div>
          </div>

          {/* Lending Strategy */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Lending (Invested)</span>
              <span className="font-mono">
                {formatCompactNumber(lendingStrategy.value)}
              </span>
            </div>
            <div className="bg-secondary relative h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full w-full flex-1 transition-all"
                style={{
                  transform: `translateX(-${100 - (lendingPercent || 0)}%)`,
                }}
              />
            </div>
          </div>

          <div
            className={cn(
              'rounded-md border p-2 text-xs',
              isWarning
                ? 'border-amber-500/20 bg-amber-500/10 text-amber-600'
                : 'border-green-500/20 bg-green-500/10 text-green-600'
            )}
          >
            {isWarning
              ? '⚠️ Rebalancing triggered.'
              : '✓ Instant redemptions available.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
