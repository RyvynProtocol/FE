import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, TrendingUp } from 'lucide-react';
import { YieldMetrics } from '../hooks/use-treasury-data';

interface YieldBudgetWidgetProps {
  metrics: YieldMetrics;
}

export default function YieldBudgetWidget({ metrics }: YieldBudgetWidgetProps) {
  return (
    <Card className="overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-purple-500/10 blur-xl" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Yield Budget
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <p className="font-semibold mb-2">Smoothed Yield Budget</p>
              <p className="text-sm">
                The protocol calculates a smoothed reward rate based on the
                Unallocated Yield Pool and moving average transfer volume. This
                protects against dilution and ensures deterministic returns.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Unallocated Yield Pool
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono tracking-tight">
              ${metrics.unallocatedPool.toLocaleString('en-US', {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}
            </span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Streaming live (+${metrics.yieldPerSecond}/sec)
          </p>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Current Reward Rate</span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {metrics.currentApy.toFixed(2)}% APY
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Backed by US Treasuries
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
