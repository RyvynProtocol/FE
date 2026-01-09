'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMockUSDC } from '@/hooks/useMockUSDC';
import { useRyUSD } from '@/hooks/useRyUSD';
import { usePrivy } from '@privy-io/react-auth';
import { AlertCircle, Info, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { ModeToggle } from './node-toggle';
import { TokenInput } from './token-input';

export default function MintRyUSD() {
  const { authenticated } = usePrivy();
  const { chain } = useAccount();
  const [amount, setAmount] = useState('');
  const [isMintMode, setIsMintMode] = useState(true);

  const {
    ryUSDBalance,
    allowance,
    withdrawRyUSD,
    approveUSDC,
    mintRyUSD,
    isApproving,
    isDepositing,
    isWithdrawing,
  } = useRyUSD();

  const { balance: usdcBalance } = useMockUSDC();

  const isWrongNetwork = chain && chain.id !== 5003;
  const needsApproval =
    allowance && amount ? parseUnits(amount, 6) > (allowance as bigint) : true;

  const formattedUSDCBalance = usdcBalance
    ? formatUnits(usdcBalance as bigint, 6)
    : '0.00';

  const formattedRyUSDBalance = ryUSDBalance
    ? formatUnits(ryUSDBalance as bigint, 6)
    : '0.00';

  const handleTransaction = async () => {
    if (!authenticated) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (isWrongNetwork) {
      toast.error('Please switch to Mantle Sepolia');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      if (isMintMode) {
        if (needsApproval) {
          approveUSDC(amount);
          toast.info('Approving USDC...');
        } else {
          mintRyUSD(amount);
          toast.info('Minting ryUSD...');
        }
      } else {
        withdrawRyUSD(amount);
        toast.info('Withdrawing USDC...');
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed. Please try again.');
    }
  };

  const handleMaxClick = () => {
    const maxAmount = isMintMode
      ? usdcBalance
        ? formatUnits(usdcBalance as bigint, 6)
        : '0'
      : ryUSDBalance
        ? formatUnits(ryUSDBalance as bigint, 6)
        : '0';
    setAmount(maxAmount);
  };

  const getButtonText = () => {
    if (!authenticated) return 'Connect Wallet';
    if (isMintMode) {
      return needsApproval ? 'Approve USDC' : 'Mint ryUSD';
    }
    return 'Withdraw to USDC';
  };

  const isLoading = isApproving || isDepositing || isWithdrawing;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-2xl font-bold">
            {isMintMode ? 'Mint ryUSD' : 'Withdraw USDC'}
          </CardTitle>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Info className="h-3 w-3" />
          <span>1:1 Exchange Rate</span>
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <TokenInput
            label="You will pay"
            value={amount}
            balance={isMintMode ? formattedUSDCBalance : formattedRyUSDBalance}
            tokenSymbol={isMintMode ? 'USDC' : 'ryUSD'}
            onChange={setAmount}
            onMaxClick={handleMaxClick}
            disabled={!authenticated}
          />

          <ModeToggle onToggle={() => setIsMintMode(!isMintMode)} />

          <TokenInput
            label="You will receive"
            value={amount || '0.00'}
            tokenSymbol={isMintMode ? 'ryUSD' : 'USDC'}
            readOnly
            disabled={!authenticated}
          />
        </div>

        <Button
          onClick={handleTransaction}
          disabled={
            !authenticated ||
            isLoading ||
            isWrongNetwork ||
            !amount ||
            parseFloat(amount) <= 0
          }
          className="mt-6 h-14 w-full rounded-xl text-lg font-medium shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {isApproving
                ? 'Approving...'
                : isDepositing
                  ? 'Minting...'
                  : 'Withdrawing...'}
            </>
          ) : (
            getButtonText()
          )}
        </Button>

        {isWrongNetwork && (
          <div className="mt-4 flex items-center gap-2 rounded bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Wrong network! Please switch to Mantle Sepolia.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
