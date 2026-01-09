'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMockUSDC } from '@/hooks/useMockUSDC';
import { useRyvynHandler } from '@/hooks/useRyvynHandler';
import { useTreasuryManager } from '@/hooks/useTreasuryManager';
import { useYieldManager } from '@/hooks/useYieldManager';
import { usePrivy } from '@privy-io/react-auth';
import { Coins, Loader2, Settings, TestTube, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatUnits } from 'viem';

export default function AdminPage() {
  const { authenticated } = usePrivy();

  // MockUSDC Admin Mint
  const [recipientAddress, setRecipientAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('10000');
  const { balance: usdcBalance, adminMint, isMintingAdmin } = useMockUSDC();

  // YieldManager Demo Tools
  const [demoVolume, setDemoVolume] = useState('');
  const [yieldAmount, setYieldAmount] = useState('');
  const {
    addDemoVolume,
    simulateYieldGeneration,
    recordDailySnapshot,
    isAddingVolume,
    isSimulatingYield,
    isRecordingSnapshot,
  } = useYieldManager();

  // TreasuryManager
  const [refillAmount, setRefillAmount] = useState('');
  const {
    harvestAllYield,
    allocate,
    refillHotWallet,
    isHarvesting,
    isAllocating,
    isRefilling,
  } = useTreasuryManager();

  // RyvynHandler
  const [userAddress, setUserAddress] = useState('');
  const { forceUpdateBucketStatuses, isUpdating } = useRyvynHandler();

  const handleAdminMint = async () => {
    if (!authenticated) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!recipientAddress || !mintAmount) {
      toast.error('Please enter both recipient address and amount');
      return;
    }
    try {
      adminMint(recipientAddress, mintAmount);
      toast.info('Minting MockUSDC...');
    } catch (error) {
      console.error('Mint failed:', error);
      toast.error('Mint failed');
    }
  };

  const formattedUSDCBalance = usdcBalance
    ? formatUnits(usdcBalance as bigint, 6)
    : '0.00';

  return (
    <div className="container mx-auto px-12 py-32">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage protocol settings and administrative functions
        </p>
      </div>

      <Tabs defaultValue="mint" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mint" className="gap-2">
            <Coins className="h-4 w-4" />
            Mint USDC
          </TabsTrigger>
          <TabsTrigger value="demo" className="gap-2">
            <TestTube className="h-4 w-4" />
            Demo Tools
          </TabsTrigger>
          <TabsTrigger value="treasury" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Treasury
          </TabsTrigger>
          <TabsTrigger value="protocol" className="gap-2">
            <Settings className="h-4 w-4" />
            Protocol
          </TabsTrigger>
        </TabsList>

        {/* Mint USDC Tab */}
        <TabsContent value="mint" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Mint MockUSDC</CardTitle>
              <CardDescription>
                Mint MockUSDC to any address (admin only, no limits)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-balance">Your USDC Balance</Label>
                <div className="text-2xl font-bold">
                  {formattedUSDCBalance} USDC
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipientAddress}
                  onChange={e => setRecipientAddress(e.target.value)}
                  disabled={!authenticated || isMintingAdmin}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USDC)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10000"
                  value={mintAmount}
                  onChange={e => setMintAmount(e.target.value)}
                  disabled={!authenticated || isMintingAdmin}
                />
              </div>

              <Button
                onClick={handleAdminMint}
                disabled={
                  !authenticated ||
                  isMintingAdmin ||
                  !recipientAddress ||
                  !mintAmount
                }
                className="w-full"
              >
                {isMintingAdmin && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isMintingAdmin ? 'Minting...' : 'Mint USDC'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demo Tools Tab */}
        <TabsContent value="demo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>YieldManager Demo Tools</CardTitle>
              <CardDescription>
                Testing and simulation functions for hackathon demo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Demo Volume */}
              <div className="space-y-4">
                <Label>Add Demo Transfer Volume</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Volume amount"
                    value={demoVolume}
                    onChange={e => setDemoVolume(e.target.value)}
                    disabled={!authenticated || isAddingVolume}
                  />
                  <Button
                    onClick={() => {
                      addDemoVolume(demoVolume);
                      toast.info('Adding demo volume...');
                    }}
                    disabled={!authenticated || isAddingVolume || !demoVolume}
                  >
                    {isAddingVolume && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add Volume
                  </Button>
                </div>
              </div>

              {/* Simulate Yield */}
              <div className="space-y-4">
                <Label>Simulate Yield Generation</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Yield amount"
                    value={yieldAmount}
                    onChange={e => setYieldAmount(e.target.value)}
                    disabled={!authenticated || isSimulatingYield}
                  />
                  <Button
                    onClick={() => {
                      simulateYieldGeneration(yieldAmount);
                      toast.info('Simulating yield...');
                    }}
                    disabled={
                      !authenticated || isSimulatingYield || !yieldAmount
                    }
                  >
                    {isSimulatingYield && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Simulate
                  </Button>
                </div>
              </div>

              {/* Record Snapshot */}
              <div className="space-y-4">
                <Label>Daily Snapshot</Label>
                <Button
                  onClick={() => {
                    recordDailySnapshot();
                    toast.info('Recording snapshot...');
                  }}
                  disabled={!authenticated || isRecordingSnapshot}
                  className="w-full"
                >
                  {isRecordingSnapshot && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Record Daily Snapshot
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Treasury Tab */}
        <TabsContent value="treasury" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Treasury Management</CardTitle>
              <CardDescription>
                Manage protocol treasury and yield distribution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Harvest All Yield */}
              <div className="space-y-4">
                <Label>Harvest Yield from Strategies</Label>
                <Button
                  onClick={() => {
                    harvestAllYield();
                    toast.info('Harvesting yield...');
                  }}
                  disabled={!authenticated || isHarvesting}
                  className="w-full"
                >
                  {isHarvesting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Harvest All Yield
                </Button>
              </div>

              {/* Allocate Funds */}
              <div className="space-y-4">
                <Label>Allocate Funds to Strategies</Label>
                <Button
                  onClick={() => {
                    allocate();
                    toast.info('Allocating funds...');
                  }}
                  disabled={!authenticated || isAllocating}
                  className="w-full"
                >
                  {isAllocating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Allocate Funds
                </Button>
              </div>

              {/* Refill Hot Wallet */}
              <div className="space-y-4">
                <Label>Refill Hot Wallet</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={refillAmount}
                    onChange={e => setRefillAmount(e.target.value)}
                    disabled={!authenticated || isRefilling}
                  />
                  <Button
                    onClick={() => {
                      refillHotWallet(refillAmount);
                      toast.info('Refilling hot wallet...');
                    }}
                    disabled={!authenticated || isRefilling || !refillAmount}
                  >
                    {isRefilling && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Refill
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Protocol Tab */}
        <TabsContent value="protocol" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Management</CardTitle>
              <CardDescription>
                Advanced protocol configuration and user management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Force Update Buckets */}
              <div className="space-y-4">
                <Label>Force Update User Buckets</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="User address"
                    value={userAddress}
                    onChange={e => setUserAddress(e.target.value)}
                    disabled={!authenticated || isUpdating}
                  />
                  <Button
                    onClick={() => {
                      forceUpdateBucketStatuses(userAddress);
                      toast.info('Updating buckets...');
                    }}
                    disabled={!authenticated || isUpdating || !userAddress}
                  >
                    {isUpdating && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
