'use client';

import React, { useState } from 'react';
import { Send, Info, Loader2 } from 'lucide-react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

export default function TransferUSDCB() {
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
  const estimatedReward = amount ? (parseFloat(amount) * 0.005).toFixed(4) : '0.00'; // 0.5% reward

  const handleTransfer = async () => {
    if (!authenticated || !connectedWallet) {
      alert('Please connect your wallet first');
      return;
    }

    if (!recipient || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid recipient address and amount');
      return;
    }

    // Basic address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual transfer logic
      // Call transfer function on USDC-B contract

      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay

      setTxHash('0xabcd...1234'); // Mock tx hash
      alert('Transfer successful!');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxClick = () => {
    setAmount(userUSDCBBalance.replace(/,/g, ''));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Transfer Card */}
      <div className="lg:col-span-2">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Transfer USDC-B</h2>
            <div className="flex items-center gap-2 text-sm text-green-400">
              <Info className="w-4 h-4" />
              <span>Earn rewards on every transfer</span>
            </div>
          </div>

      <div className="space-y-4">
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
          <label className="text-sm text-slate-400 mb-2 block">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full bg-transparent text-white outline-none font-mono"
            disabled={!authenticated}
          />
        </div>

        {/* Amount Input */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-slate-400">Amount</label>
            <button
              onClick={handleMaxClick}
              className="px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-sm rounded-lg transition-colors"
              disabled={!authenticated}
            >
              MAX
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-3xl text-white outline-none"
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
              <span className="text-slate-400">Your Reward (Sender)</span>
              <span className="text-green-400">+{estimatedReward} USDC-B</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Recipient Reward</span>
              <span className="text-green-400">+{estimatedReward} USDC-B</span>
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
        <button
          onClick={handleTransfer}
          disabled={!authenticated || isLoading || !recipient || !amount || parseFloat(amount) <= 0}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Transferring...
            </>
          ) : !authenticated ? (
            'Connect Wallet to Transfer'
          ) : (
            <>
              <Send className="w-5 h-5" />
              Transfer USDC-B
            </>
          )}
        </button>

          {txHash && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-400">
                Transfer successful! Hash: <span className="font-mono">{txHash}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Info Sidebar */}
      <div className="space-y-6">
        {/* Rewards Info */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Transfer Rewards</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <p>Sender earns 0.5% in Stream Bonds</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <p>Recipient earns 0.5% in Stream Bonds</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <p>Stream Bonds accumulate yield over time</p>
            </div>
          </div>
        </div>

        {/* Why Transfer? */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Why Transfer?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
              <div>
                <p className="text-white font-medium text-sm">Double Rewards</p>
                <p className="text-slate-400 text-xs">Both parties earn on every transaction</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
              <div>
                <p className="text-white font-medium text-sm">Instant Settlement</p>
                <p className="text-slate-400 text-xs">Fast on-chain transfers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5"></div>
              <div>
                <p className="text-white font-medium text-sm">No Fees</p>
                <p className="text-slate-400 text-xs">Only gas costs, no protocol fees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
          <div className="space-y-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
