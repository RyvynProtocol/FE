'use client';

import React, { useState } from 'react';
import { Send, Info, Loader2 } from 'lucide-react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TransferRyUSD() {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const connectedWallet = wallets[0];

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');

  // Mock data - replace with actual contract calls
  const userUSDCBBalance = '12,458.50'; // Replace with actual balance
  const estimatedGas = '0.0008'; // Replace with actual gas estimation
  const totalReward = amount ? parseFloat(amount) * 0.01 : 0; // 1% total reward
  const senderReward = (totalReward * 0.7).toFixed(4); // 70% for sender
  const receiverReward = (totalReward * 0.3).toFixed(4); // 30% for receiver

  // Mock transfer history data
  const transferHistory = [
    {
      amount: '500',
      from: '0x1234...5678',
      to: '0xabcd...ef12',
      timestamp: Date.now() - 3600000 * 2, // 2 hours ago
      senderReward: '3.5', // 70% of 5
      receiverReward: '1.5', // 30% of 5
    },
    {
      amount: '1000',
      from: '0x9876...5432',
      to: '0x1234...5678',
      timestamp: Date.now() - 86400000 * 1, // 1 day ago
      senderReward: '7.0', // 70% of 10
      receiverReward: '3.0', // 30% of 10
    },
    {
      amount: '250',
      from: '0x1234...5678',
      to: '0x2468...1357',
      timestamp: Date.now() - 86400000 * 3, // 3 days ago
      senderReward: '1.75', // 70% of 2.5
      receiverReward: '0.75', // 30% of 2.5
    },
    {
      amount: '750',
      from: '0xfedc...ba98',
      to: '0x1234...5678',
      timestamp: Date.now() - 86400000 * 5, // 5 days ago
      senderReward: '5.25', // 70% of 7.5
      receiverReward: '2.25', // 30% of 7.5
    },
  ];

  // Format timestamp to date time
  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleTransfer = async () => {
    if (!authenticated || !connectedWallet) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!recipient || !amount || parseFloat(amount) <= 0) {
      toast.error('Please enter valid recipient address and amount');
      return;
    }

    // Basic address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      toast.error('Please enter a valid Ethereum address');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual transfer logic
      // Call transfer function on USDC-B contract

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay

      setTxHash('0xabcd...1234'); // Mock tx hash
      toast.success('Transfer successful!');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transfer failed:', error);
      toast.error('Transfer failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxClick = () => {
    setAmount(userUSDCBBalance.replace(/,/g, ''));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Transfer Card */}
        <div className="lg:col-span-2">
          <Card className="glass-card border-none bg-slate-900/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <div>
                <CardTitle className="text-2xl font-bold text-white">Transfer USDC-B</CardTitle>
                <CardDescription className="text-green-400 flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  Earn rewards on every transfer
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Balance Display */}
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Your USDC-B Balance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      B
                    </div>
                    <span className="text-white font-bold text-lg">{userUSDCBBalance}</span>
                  </div>
                </div>
              </div>

              {/* Recipient Address */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <Label className="text-sm text-slate-400 mb-2 block">Recipient Address</Label>
                <Input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="bg-transparent border-none text-white font-mono placeholder:text-slate-600 focus-visible:ring-0 px-0 h-auto"
                  disabled={!authenticated}
                />
              </div>

              {/* Amount Input */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm text-slate-400">Amount</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMaxClick}
                    className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 h-8"
                    disabled={!authenticated}
                  >
                    MAX
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-transparent border-none text-3xl text-white placeholder:text-slate-600 focus-visible:ring-0 px-0 h-auto shadow-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    disabled={!authenticated}
                  />
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      B
                    </div>
                    <span className="font-medium text-white">USDC-B</span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              {amount && parseFloat(amount) > 0 && (
                <div className="space-y-2 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Estimated Gas</span>
                    <span className="text-white">{estimatedGas} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Your Reward (Sender - 70%)</span>
                    <span className="text-green-400">+{senderReward} USDC-B</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Recipient Reward (30%)</span>
                    <span className="text-green-400">+{receiverReward} USDC-B</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-700/50">
                    <span className="text-slate-400 font-medium">Recipient Receives</span>
                    <span className="text-white font-medium">{amount} USDC-B</span>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="flex gap-2">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-300">
                    Both you and the recipient will earn Stream Bonds rewards on this transfer!
                  </p>
                </div>
              </div>

              {/* Transfer Button */}
              <Button
                onClick={handleTransfer}
                disabled={
                  !authenticated || isLoading || !recipient || !amount || parseFloat(amount) <= 0
                }
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-800 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Transferring...
                  </>
                ) : !authenticated ? (
                  'Connect Wallet to Transfer'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Transfer USDC-B
                  </>
                )}
              </Button>

              {txHash && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    Transfer successful! Hash: <span className="font-mono">{txHash}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* Rewards Info */}
          <Card className="glass-card border-none bg-slate-900/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Transfer Rewards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-400">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <p>Sender earns 70% of total rewards in Stream Bonds</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <p>Recipient earns 30% of total rewards in Stream Bonds</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <p>Stream Bonds accumulate yield over time</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card border-none bg-slate-900/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Sent</span>
                <span className="text-white font-medium">$5,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Transfers Made</span>
                <span className="text-white font-medium">67</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Rewards Earned</span>
                <span className="text-green-400 font-medium">+26.17 SB</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transfer History Table */}
      <Card className="glass-card border-none bg-slate-900/40 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Amount Transfer</TableHead>
                <TableHead className="text-slate-400">From</TableHead>
                <TableHead className="text-slate-400">To</TableHead>
                <TableHead className="text-slate-400">Time</TableHead>
                <TableHead className="text-slate-400">Your Reward</TableHead>
                <TableHead className="text-slate-400">Receiver Reward</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transferHistory.map((transfer, index) => (
                <TableRow
                  key={index}
                  className="border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{transfer.amount}</span>
                      <span className="text-slate-400 text-sm">USDC-B</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-white font-mono text-sm">{transfer.from}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-white font-mono text-sm">{transfer.to}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-400 text-sm">
                      {formatDateTime(transfer.timestamp)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-400 font-medium">+{transfer.senderReward}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-400 font-medium">+{transfer.receiverReward}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
