import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, Loader2, Wallet } from 'lucide-react';
import { ClaimTransaction } from '../hooks/use-reward-data';
import { useCounterAnimation } from '../hooks/use-counter-animation';

interface ClaimActionCardProps {
  balance: number;
  onClaim: () => Promise<void>;
  claimTx: ClaimTransaction;
}

export default function ClaimActionCard({
  balance,
  onClaim,
  claimTx,
}: ClaimActionCardProps) {
  const isPending = claimTx.status === 'pending';
  const isSuccess = claimTx.status === 'success';
  const isDisabled = balance <= 0 || isPending;

  const animatedBalance = useCounterAnimation({
    end: balance,
    duration: 1500,
    decimals: 2,
  });

  const formattedBalance = `$${animatedBalance}`;

  if (isSuccess) {
    return (
      <Card className="w-full border-green-500/20 bg-card">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="mb-4 h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700">
            Claim Successful!
          </h3>
          <p className="text-muted-foreground mt-2">
            Your earnings have been sent to your wallet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-card shadow-xl">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Wallet className="text-primary h-5 w-5" />
            </div>
            Claim Rewards
          </CardTitle>
          <div className="flex h-2 w-2 animate-pulse rounded-full bg-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pb-6 pt-0">
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-chart-2/5 p-6 shadow-inner">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Available to Claim
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </div>
            <p className="text-4xl font-bold tracking-tight">{formattedBalance}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-3 w-3 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Claiming will transfer your pending yield to your connected wallet.
              Network fees apply.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          className="w-full"
          size="lg"
          onClick={onClaim}
          disabled={isDisabled}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Processing...' : 'Claim Reward'}
        </Button>
      </CardFooter>
    </Card>
  );
}
