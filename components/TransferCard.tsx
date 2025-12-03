'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Info } from 'lucide-react';

export default function TransferCard() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const rewardRate = 0.1; // 0.1% per transfer

  const calculateReward = () => {
    const amt = parseFloat(amount) || 0;
    return (amt * rewardRate / 100).toFixed(2);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Transfer USDC-B</h2>
        <div className="flex items-center gap-2 text-yellow-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Earn on Transfer</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              USDC-B
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-2 block">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {amount && parseFloat(amount) > 0 && (
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-300 font-medium mb-1">Reward Preview</p>
                <p className="text-xs text-slate-400">Both you and recipient will earn Stream Bonds</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">You Earn</p>
                <p className="text-lg font-bold text-white">{(parseFloat(calculateReward()) / 2).toFixed(2)}</p>
                <p className="text-xs text-purple-400">Stream Bonds</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">Recipient Earns</p>
                <p className="text-lg font-bold text-white">{(parseFloat(calculateReward()) / 2).toFixed(2)}</p>
                <p className="text-xs text-purple-400">Stream Bonds</p>
              </div>
            </div>
          </div>
        )}

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl py-3 font-medium text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 glow disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!amount || !recipient}
        >
          Transfer
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
