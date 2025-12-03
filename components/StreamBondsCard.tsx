'use client';

import React from 'react';
import { TrendingUp, Zap, Clock } from 'lucide-react';

interface StreamBond {
  id: string;
  amount: string;
  apy: string;
  earned: string;
  startDate: string;
}

export default function StreamBondsCard() {
  const streamBonds: StreamBond[] = [
    {
      id: '1',
      amount: '125.50',
      apy: '10.2',
      earned: '2.34',
      startDate: '2024-11-15'
    },
    {
      id: '2',
      amount: '89.30',
      apy: '10.2',
      earned: '1.67',
      startDate: '2024-11-20'
    },
    {
      id: '3',
      amount: '250.00',
      apy: '10.2',
      earned: '4.12',
      startDate: '2024-11-28'
    }
  ];

  const totalBonds = streamBonds.reduce((acc, bond) => acc + parseFloat(bond.amount), 0);
  const totalEarned = streamBonds.reduce((acc, bond) => acc + parseFloat(bond.earned), 0);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Your Stream Bonds</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-400">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
          <p className="text-sm text-slate-400 mb-1">Total Stream Bonds</p>
          <p className="text-2xl font-bold text-white mb-1">{totalBonds.toFixed(2)}</p>
          <div className="flex items-center gap-1 text-purple-400">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium">USDC Value</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
          <p className="text-sm text-slate-400 mb-1">Total Earned</p>
          <p className="text-2xl font-bold text-white mb-1">{totalEarned.toFixed(2)}</p>
          <div className="flex items-center gap-1 text-green-400">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-medium">Streaming Now</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-slate-400">Active Streams</h3>
          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            View All
          </button>
        </div>

        {streamBonds.map((bond) => (
          <div
            key={bond.id}
            className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Stream Bond #{bond.id}</p>
                  <p className="text-xs text-slate-400">Since {bond.startDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{bond.amount} USDC</p>
                <p className="text-xs text-green-400">+{bond.earned} earned</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-slate-400">Streaming at {bond.apy}% APY</span>
              </div>
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Claim
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
