'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Info, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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

      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay

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
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div>
            <CardTitle className="text-2xl font-bold">
              Transfer USDC-B
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Balance Display */}
          <div className="rounded-xl border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Your USDC-B Balance
              </span>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  B
                </div>
                <span className="text-lg font-bold">
                  {userUSDCBBalance}
                </span>
              </div>
            </div>
          </div>

          {/* Recipient Address */}
          <div className="rounded-xl border p-4">
            <Label className="mb-2 block text-sm text-muted-foreground">
              Recipient Address
            </Label>
            <Input
              type="text"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="0x..."
              className="h-auto border-none bg-transparent px-0 font-mono placeholder:text-muted-foreground focus-visible:ring-0 shadow-none"
              disabled={!authenticated}
            />
          </div>

          {/* Amount Input */}
          <div className="rounded-xl border p-4">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-sm text-muted-foreground">Amount</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMaxClick}
                className="h-8 text-primary hover:text-primary/80"
                disabled={!authenticated}
              >
                MAX
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="h-auto flex-1 border-none bg-transparent px-0 text-3xl shadow-none [appearance:textfield] placeholder:text-muted-foreground focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                disabled={!authenticated}
              />
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  B
                </div>
                <span className="font-medium">USDC-B</span>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          {amount && parseFloat(amount) > 0 && (
            <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Gas</span>
                <span>{estimatedGas} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex cursor-pointer items-center gap-1 text-muted-foreground decoration-dotted underline-offset-2 hover:underline">
                      Your Reward (Sender)
                      <Info className="h-3 w-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You earn 70% of the Stream Bonds rewards generated by this transfer.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-green-600 dark:text-green-400">
                  +{senderReward} USDC-B
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex cursor-pointer items-center gap-1 text-muted-foreground decoration-dotted underline-offset-2 hover:underline">
                      Recipient Reward
                      <Info className="h-3 w-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The recipient earns 30% of the Stream Bonds rewards.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-green-600 dark:text-green-400">
                  +{receiverReward} USDC-B
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm">
                <span className="font-medium text-muted-foreground">
                  Recipient Receives
                </span>
                <span className="font-medium">
                  {amount} USDC-B
                </span>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="rounded-lg border bg-muted/50 p-3">
            <div className="flex gap-2">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Both you and the recipient will earn Stream Bonds rewards on
                this transfer!
              </p>
            </div>
          </div>

          {/* Transfer Button */}
          <Button
            onClick={handleTransfer}
            disabled={
              !authenticated ||
              isLoading ||
              !recipient ||
              !amount ||
              parseFloat(amount) <= 0
            }
            className="h-14 w-full rounded-xl text-lg font-medium shadow-sm"
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
                <Send className="mr-2 h-5 w-5" />
                Transfer USDC-B
              </>
            )}
          </Button>

          {txHash && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3">
              <p className="text-sm text-green-600 dark:text-green-400">
                Transfer successful! Hash:{' '}
                <span className="font-mono">{txHash}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
