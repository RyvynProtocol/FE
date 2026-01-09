import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpRight } from 'lucide-react';
import { useCounterAnimation } from '../hooks/use-counter-animation';

interface ClaimableBalanceTickerProps {
  balance: number;
  earningsRateApy?: number;
  flowRatePerSecond?: number;
  isLoading?: boolean;
}

export default function ClaimableBalanceTicker({
  balance,
  earningsRateApy,
  flowRatePerSecond,
  isLoading,
}: ClaimableBalanceTickerProps) {
  if (isLoading) {
    return <Skeleton className="h-16 w-64" />;
  }

  const animatedBalance = useCounterAnimation({
    end: balance,
    duration: 1500,
    decimals: 6,
  });

  const formattedBalance = `$${animatedBalance}`;

  const dailyEarnings = flowRatePerSecond ? flowRatePerSecond * 86400 : 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Pending Yield
        </h3>
        <div className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl tabular-nums">
            {formattedBalance}
        </div>
      </div>

      {earningsRateApy !== undefined && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
            <ArrowUpRight className="h-5 w-5" />
            <span>
                {earningsRateApy.toFixed(2)}% APY
            </span>
            <span className="text-muted-foreground font-normal">
                (≈${dailyEarnings.toFixed(2)} / day)
            </span>
          </div>
      )}
    </div>
  );
}