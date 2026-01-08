'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ArrowDownUp, Info, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MintRyUSD() {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const connectedWallet = wallets[0];

  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mintedAmount, setMintedAmount] = useState('');

  // Mock data - replace with actual contract calls
  const userUSDCBalance = '1,245.50'; // Replace with actual balance
  const estimatedGas = '0.0012'; // Replace with actual gas estimation

  // Mock mint history data
  const mintHistory = [
    {
      amount: '1000',
      timestamp: Date.now() - 86400000 * 5,
      status: 'Invested',
    }, // 5 days ago
    { amount: '500', timestamp: Date.now() - 86400000 * 2, status: 'Invested' }, // 2 days ago
    {
      amount: '250',
      timestamp: Date.now() - 3600000 * 12,
      status: 'Uninvested',
    }, // 12 hours ago
    {
      amount: '750',
      timestamp: Date.now() - 3600000 * 3,
      status: 'Uninvested',
    }, // 3 hours ago
  ];

  // Calculate elapsed time
  const getElapsedTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleMint = async () => {
    if (!authenticated || !connectedWallet) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      // Mock delay for transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Set the minted amount and show success
      setMintedAmount(toAmount || fromAmount);
      setShowSuccess(true);
      toast.success(`Successfully minted ${toAmount || fromAmount} USDC-B!`);

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFromAmount('');
        setToAmount('');
      }, 3000);
    } catch (error) {
      console.error('Minting failed:', error);
      toast.error('Minting failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxClick = () => {
    // Remove commas and set the amount
    const maxAmount = userUSDCBalance.replace(/,/g, '');
    setFromAmount(maxAmount);
    setToAmount(maxAmount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-2xl font-bold">Mint USDC-B</CardTitle>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Info className="h-3 w-3" />
          <span>1:1 Exchange Rate</span>
        </Badge>
      </CardHeader>
      <CardContent>
        {/* Input Section */}
        <div className="space-y-4">
          {/* From (USDC) */}
          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-muted-foreground text-sm">
                You will pay
              </Label>
              <div className="text-muted-foreground text-sm">
                Balance:{' '}
                <span className="text-foreground">{userUSDCBalance} USDC</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={fromAmount}
                onChange={e => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="placeholder:text-muted-foreground min-w-0 flex-1 [appearance:textfield] bg-transparent text-3xl outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                disabled={!authenticated}
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxClick}
                  className="h-8"
                  disabled={!authenticated}
                >
                  MAX
                </Button>
                <div className="flex items-center gap-2 rounded-lg px-3 py-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    U
                  </div>
                  <span className="font-medium">USDC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="relative z-10 flex justify-center">
            <div className="bg-background rounded-full border p-2 shadow-sm">
              <ArrowDownUp className="text-muted-foreground h-5 w-5" />
            </div>
          </div>

          {/* To (USDC-B) */}
          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-muted-foreground text-sm">
                You will mint
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={toAmount}
                onChange={e => setToAmount(e.target.value)}
                placeholder="0.00"
                className="placeholder:text-muted-foreground min-w-0 flex-1 [appearance:textfield] bg-transparent text-3xl outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                disabled={!authenticated}
              />
              <div className="flex items-center gap-2 rounded-lg px-3 py-2">
                <div className="text-background bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                  R
                </div>
                <span className="font-medium">RyUSD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mint Button */}
        <Button
          onClick={handleMint}
          disabled={
            !authenticated ||
            isLoading ||
            !fromAmount ||
            parseFloat(fromAmount) <= 0
          }
          className="mt-6 h-14 w-full rounded-xl text-lg font-medium shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Minting...
            </>
          ) : !authenticated ? (
            'Connect Wallet to Mint'
          ) : (
            'Mint'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
