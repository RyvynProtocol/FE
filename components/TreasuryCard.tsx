'use client';

import React from 'react';
import { PieChart, Shield, TrendingUp } from 'lucide-react';

export default function TreasuryCard() {
  const treasuryData = {
    total: '10,000,000',
    yield: '5.2',
    allocations: [
      { name: 'US Treasury Bills', percentage: 60, amount: '6,000,000', color: 'from-blue-500 to-cyan-500' },
      { name: 'Corporate Bonds', percentage: 25, amount: '2,500,000', color: 'from-purple-500 to-pink-500' },
      { name: 'Liquid Buffer', percentage: 10, amount: '1,000,000', color: 'from-green-500 to-emerald-500' },
      { name: 'Protocol Reserve', percentage: 5, amount: '500,000', color: 'from-orange-500 to-red-500' }
    ]
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Treasury Overview</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">Secured</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-blue-400" />
            <p className="text-sm text-slate-400">Total Treasury Value</p>
          </div>
          <p className="text-3xl font-bold text-white mb-1">${treasuryData.total}</p>
          <p className="text-xs text-slate-400">USDC Equivalent</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <p className="text-sm text-slate-400">Current Yield Rate</p>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{treasuryData.yield}%</p>
          <p className="text-xs text-green-400">↑ 0.3% this month</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-400">Asset Allocation</h3>

        {treasuryData.allocations.map((allocation, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${allocation.color}`}></div>
                <span className="text-slate-300">{allocation.name}</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">{allocation.percentage}%</span>
                <span className="text-slate-400 ml-2">${allocation.amount}</span>
              </div>
            </div>

            <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${allocation.color} transition-all duration-500`}
                style={{ width: `${allocation.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Annual Yield Generation</span>
          <span className="text-white font-medium">~$520,000</span>
        </div>
      </div>
    </div>
  );
}
