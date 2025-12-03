'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { PieChart, TrendingUp, Shield, Wallet } from 'lucide-react';

export default function StreamBondsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      <Sidebar />

      <div className="relative z-10 md:ml-64">
        <main className="max-w-6xl mx-auto px-6 py-8 pb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Yield Bonds</h1>
            <p className="text-slate-400">Your rewards backed by real-world assets</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - User's Bonds */}
            <div className="lg:col-span-2 space-y-6">
              {/* Total Yield Bonds */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Your Yield Bonds</h2>
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg">
                    Active
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <p className="text-slate-400 text-sm mb-1">Total Value</p>
                    <p className="text-3xl font-bold text-white">464.80</p>
                    <p className="text-slate-400 text-xs mt-1">USDC equivalent</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <p className="text-slate-400 text-sm mb-1">Earning Now</p>
                    <p className="text-3xl font-bold text-green-400">8.13</p>
                    <p className="text-slate-400 text-xs mt-1">Streaming yield</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                    <p className="text-slate-400 text-sm mb-1">Current APY</p>
                    <p className="text-3xl font-bold text-blue-400">10.2%</p>
                    <p className="text-slate-400 text-xs mt-1">From RWA yields</p>
                  </div>
                </div>

                {/* Active Bonds List */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white mb-4">Active Bonds</h3>

                  {/* Bond #1 */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Yield Bond #1</p>
                          <p className="text-slate-400 text-xs">Since 2024-11-15</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">125.50 USDC</p>
                        <p className="text-green-400 text-sm">+2.34 earned</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <p className="text-slate-400 text-xs">Streaming at 10.2% APY</p>
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs rounded-lg transition-colors">
                        Claim
                      </button>
                    </div>
                  </div>

                  {/* Bond #2 */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Yield Bond #2</p>
                          <p className="text-slate-400 text-xs">Since 2024-11-20</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">89.30 USDC</p>
                        <p className="text-green-400 text-sm">+1.67 earned</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <p className="text-slate-400 text-xs">Streaming at 10.2% APY</p>
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs rounded-lg transition-colors">
                        Claim
                      </button>
                    </div>
                  </div>

                  {/* Bond #3 */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Yield Bond #3</p>
                          <p className="text-slate-400 text-xs">Since 2024-11-25</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">250.00 USDC</p>
                        <p className="text-green-400 text-sm">+4.12 earned</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <p className="text-slate-400 text-xs">Streaming at 10.2% APY</p>
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs rounded-lg transition-colors">
                        Claim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Treasury Backing */}
            <div className="space-y-6">
              {/* Treasury Allocation */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Backed by RWA</h3>
                </div>

                <p className="text-slate-400 text-sm mb-4">
                  Your yields are secured by real-world assets held in treasury
                </p>

                <div className="space-y-3">
                  {/* US T-Bills */}
                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">US T-Bills (ONDO)</span>
                      <span className="text-blue-400 font-bold">60%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>

                  {/* Corporate Bonds */}
                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">Corporate Bonds</span>
                      <span className="text-purple-400 font-bold">25%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>

                  {/* Liquid Buffer */}
                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">USDC Buffer</span>
                      <span className="text-green-400 font-bold">10%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '10%'}}></div>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">For redemptions</p>
                  </div>

                  {/* Protocol Reserve */}
                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium text-sm">Protocol Reserve</span>
                      <span className="text-orange-400 font-bold">5%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '5%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">How Yields Work</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      1
                    </div>
                    <p className="text-slate-400">Earn bonds on every USDC-B transfer</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      2
                    </div>
                    <p className="text-slate-400">Bonds stream yield from RWA treasury</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      3
                    </div>
                    <p className="text-slate-400">Claim yields anytime to your wallet</p>
                  </div>
                </div>
              </div>

              {/* Treasury Stats */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Treasury Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Total Value</span>
                    <span className="text-white font-medium">$10.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Avg Yield</span>
                    <span className="text-green-400 font-medium">10.2% APY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Active Bonds</span>
                    <span className="text-white font-medium">1,234</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
