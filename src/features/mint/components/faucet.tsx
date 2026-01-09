'use client';

import { useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useMockUSDC } from '@/hooks/useMockUSDC';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export function Faucet() {
  const [amount, setAmount] = useState('10000');
  const { chain } = useAccount();
  const { balance, claimFaucet, isMintingPublic } = useMockUSDC();

  const isWrongNetwork = chain && chain.id !== 5003;

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">MockUSDC Faucet</h2>
      
      <p className="mb-4">
        Your Balance: {balance ? formatUnits(balance as bigint, 6) : '0'} USDC
      </p>

      <div className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (max 100,000)"
          className="w-full px-4 py-2 border rounded"
        />
        
      <Button
        onClick={async () => await claimFaucet(amount)}
        disabled={isMintingPublic || isWrongNetwork}
        className="w-full"
      >
        {isMintingPublic && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isMintingPublic ? 'Claiming...' : 'Claim USDC'}
      </Button>

      {isWrongNetwork && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded">
          <AlertCircle className="h-4 w-4" />
          <span>Wrong network! Please switch to Mantle Sepolia.</span>
        </div>
      )}

        {isWrongNetwork && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded">
            <AlertCircle className="h-4 w-4" />
            <span>Wrong network! Please switch to Mantle Sepolia.</span>
          </div>
        )}
      </div>
    </div>
  );
}