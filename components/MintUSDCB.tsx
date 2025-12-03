'use client';

import React, { useState } from 'react';
import { ArrowDownUp, Info, Loader2 } from 'lucide-react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

export default function MintUSDCB() {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const connectedWallet = wallets[0];

  const [inputAmount, setInputAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');

  // Mock data - replace with actual contract calls
  const exchangeRate = 1.0; // 1 USDC = 1 USDC-B
  const estimatedOutput = inputAmount ? (parseFloat(inputAmount) * exchangeRate).toFixed(2) : '0.00';
  const userUSDCBalance = '1,245.50'; // Replace with actual balance
  const estimatedGas = '0.0012'; // Replace with actual gas estimation

  const handleMint = async () => {
    if (!authenticated || !connectedWallet) {
      alert('Please connect your wallet first');
      return;
    }

    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual minting logic
      // 1. Approve USDC spending
      // 2. Call mint function on USDC-B contract

      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay

      setTxHash('0x1234...5678'); // Mock tx hash
      alert('Minting successful!');
      setInputAmount('');
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Minting failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxClick = () => {
    // Remove commas and set the amount
    setInputAmount(userUSDCBalance.replace(/,/g, ''));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Mint Card */}
      <div className="lg:col-span-2">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Mint USDC-B</h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Info className="w-4 h-4" />
              <span>1:1 Exchange Rate</span>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            {/* From (USDC) */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-slate-400">From</label>
                <div className="text-sm text-slate-400">
                  Balance: <span className="text-white">{userUSDCBalance} USDC</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-3xl text-white outline-none"
                  disabled={!authenticated}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMaxClick}
                    className="px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-sm rounded-lg transition-colors"
                    disabled={!authenticated}
                  >
                    MAX
                  </button>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      U
                    </div>
                    <span className="font-medium text-white">USDC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="flex justify-center -my-2">
              <div className="bg-slate-800 border-4 border-slate-900 rounded-full p-2">
                <ArrowDownUp className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* To (USDC-B) */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-slate-400">To</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={estimatedOutput}
                  readOnly
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-3xl text-white outline-none"
                />
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    B
                  </div>
                  <span className="font-medium text-white">USDC-B</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          {inputAmount && parseFloat(inputAmount) > 0 && (
            <div className="mt-6 space-y-2 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Exchange Rate</span>
                <span className="text-white">1 USDC = 1 USDC-B</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Gas</span>
                <span className="text-white">{estimatedGas} ETH</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-700/50">
                <span className="text-slate-400">You will receive</span>
                <span className="text-white font-medium">{estimatedOutput} USDC-B</span>
              </div>
            </div>
          )}

          {/* Mint Button */}
          <button
            onClick={handleMint}
            disabled={!authenticated || isLoading || !inputAmount || parseFloat(inputAmount) <= 0}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Minting...
              </>
            ) : !authenticated ? (
              'Connect Wallet to Mint'
            ) : (
              'Mint USDC-B'
            )}
          </button>

          {txHash && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-400">
                Transaction successful! Hash: <span className="font-mono">{txHash}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="space-y-6">
        {/* How it Works */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">How it Works</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <p>Deposit USDC to mint USDC-B at a 1:1 ratio</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <p>Start earning Stream Bonds on every transfer</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <p>Redeem USDC-B back to USDC anytime</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Benefits</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
              <div>
                <p className="text-white font-medium text-sm">Earn on Transfers</p>
                <p className="text-slate-400 text-xs">Both sender & receiver earn rewards</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
              <div>
                <p className="text-white font-medium text-sm">RWA-Backed Yields</p>
                <p className="text-slate-400 text-xs">Backed by real T-Bills & bonds</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5"></div>
              <div>
                <p className="text-white font-medium text-sm">Tier System</p>
                <p className="text-slate-400 text-xs">Level up for higher multipliers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Protocol Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Minted</span>
              <span className="text-white font-medium">$12.4M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Treasury Value</span>
              <span className="text-white font-medium">$10.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Current APY</span>
              <span className="text-green-400 font-medium">8.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
