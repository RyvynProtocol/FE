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

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance);

  if (isSuccess) {
    return (
      <Card className="w-full border-green-500/20 bg-green-500/10">
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="text-primary h-5 w-5" />
          Claim Rewards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-muted-foreground text-sm font-medium">
            Available to Claim
          </p>
          <p className="text-3xl font-bold">{formattedBalance}</p>
        </div>
        <p className="text-muted-foreground text-xs">
          Claiming will transfer your pending yield to your connected wallet.
          Network fees apply.
        </p>
      </CardContent>
      <CardFooter>
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
