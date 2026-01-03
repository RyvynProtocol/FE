'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Mint Card */}
        <div className="lg:col-span-2">
          <Card className="glass-card border-none bg-slate-900/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  Mint USDC-B
                </CardTitle>
              </div>
              <Badge
                variant="secondary"
                className="gap-1 bg-slate-800 text-slate-400 hover:bg-slate-800"
              >
                <Info className="h-3 w-3" />
                <span>1:1 Exchange Rate</span>
              </Badge>
            </CardHeader>
            <CardContent>
              {/* Input Section */}
              <div className="space-y-4">
                {/* From (USDC) */}
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-sm text-slate-400">From</Label>
                    <div className="text-sm text-slate-400">
                      Balance:{' '}
                      <span className="text-white">{userUSDCBalance} USDC</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={e => setFromAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-3xl text-white outline-none [appearance:textfield] placeholder:text-slate-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      disabled={!authenticated}
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMaxClick}
                        className="h-8 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 hover:text-indigo-300"
                        disabled={!authenticated}
                      >
                        MAX
                      </Button>
                      <div className="flex items-center gap-2 rounded-lg bg-slate-700/50 px-3 py-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                          U
                        </div>
                        <span className="font-medium text-white">USDC</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="relative z-10 -my-2 flex justify-center">
                  <div className="rounded-full border-4 border-slate-900 bg-slate-800 p-2 shadow-xl">
                    <ArrowDownUp className="h-5 w-5 text-slate-400" />
                  </div>
                </div>

                {/* To (USDC-B) */}
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-sm text-slate-400">To</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={toAmount}
                      onChange={e => setToAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-3xl text-white outline-none [appearance:textfield] placeholder:text-slate-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      disabled={!authenticated}
                    />
                    <div className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-600/20 px-3 py-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                        B
                      </div>
                      <span className="font-medium text-white">USDC-B</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              {fromAmount && parseFloat(fromAmount) > 0 && (
                <div className="mt-6 space-y-2 rounded-lg border border-slate-700/30 bg-slate-800/30 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Exchange Rate</span>
                    <span className="text-white">1 USDC = 1 USDC-B</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Estimated Gas</span>
                    <span className="text-white">{estimatedGas} ETH</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700/50 pt-2 text-sm">
                    <span className="text-slate-400">You will receive</span>
                    <span className="font-medium text-white">
                      {toAmount || fromAmount} USDC-B
                    </span>
                  </div>
                </div>
              )}

              {/* Mint Button */}
              <Button
                onClick={handleMint}
                disabled={
                  !authenticated ||
                  isLoading ||
                  !fromAmount ||
                  parseFloat(fromAmount) <= 0
                }
                className="mt-6 h-14 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-medium text-white shadow-lg transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/25 disabled:from-slate-700 disabled:to-slate-800"
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
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* How it Works */}
          <Card className="glass-card border-none bg-slate-900/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">
                How it Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-400">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 font-bold text-blue-400">
                  1
                </div>
                <p>Deposit USDC to mint USDC-B at a 1:1 ratio</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 font-bold text-purple-400">
                  2
                </div>
                <p>Start earning Stream Bonds on every transfer</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/20 font-bold text-pink-400">
                  3
                </div>
                <p>Redeem USDC-B back to USDC anytime</p>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="glass-card border-none bg-slate-900/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">
                Protocol Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Total Minted</span>
                <span className="font-medium text-white">$12.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Treasury Value</span>
                <span className="font-medium text-white">$10.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Current APY</span>
                <span className="font-medium text-green-400">8.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mint History Table */}

        <Card className="glass-card border-none bg-slate-900/40 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Mint History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400">Amount</TableHead>
                  <TableHead className="text-slate-400">
                    Holding Period
                  </TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mintHistory.map((mint, index) => (
                  <TableRow
                    key={index}
                    className="border-slate-800 transition-colors hover:bg-slate-800/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {mint.amount}
                        </span>
                        <span className="text-sm text-slate-400">USDC-B</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-white">
                        {getElapsedTime(mint.timestamp)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          mint.status === 'Invested'
                            ? 'border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            : 'border-slate-500/20 bg-slate-500/10 text-slate-400 hover:bg-slate-500/20'
                        }`}
                      >
                        {mint.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
