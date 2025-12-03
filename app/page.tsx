'use client';

import React from 'react';
import { Wallet, TrendingUp, Zap, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import TransferCard from '@/components/TransferCard';
import StreamBondsCard from '@/components/StreamBondsCard';
import TreasuryCard from '@/components/TreasuryCard';
import TierCard from '@/components/TierCard';
import TransactionHistory from '@/components/TransactionHistory';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 pb-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Earn While You
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Transfer</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The first stablecoin that rewards every transaction with real-world asset-backed yields
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Your Balance"
              value="12,458.50"
              subtitle="USDC-B"
              icon={Wallet}
              gradient="from-blue-500 to-cyan-500"
              trend={{ value: "12.5%", isPositive: true }}
            />
            <StatCard
              title="Total Earned"
              value="324.67"
              subtitle="Stream Bonds Value"
              icon={Zap}
              gradient="from-purple-500 to-pink-500"
              trend={{ value: "8.3%", isPositive: true }}
            />
            <StatCard
              title="Active Streams"
              value="3"
              subtitle="Earning 10.2% APY"
              icon={TrendingUp}
              gradient="from-green-500 to-emerald-500"
            />
            <StatCard
              title="Transfers Made"
              value="67"
              subtitle="Silver Tier"
              icon={Users}
              gradient="from-orange-500 to-red-500"
              trend={{ value: "15", isPositive: true }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <TransferCard />
              <TreasuryCard />
              <TransactionHistory />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              <StreamBondsCard />
              <TierCard />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Rewards</h3>
              <p className="text-sm text-slate-400">
                Both sender and recipient earn Stream Bonds on every transfer automatically
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real Yields</h3>
              <p className="text-sm text-slate-400">
                Backed by tokenized T-Bills and bonds, not token inflation or ponzinomics
              </p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tier Benefits</h3>
              <p className="text-sm text-slate-400">
                Level up your tier to unlock higher reward multipliers and exclusive benefits
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="glass-card inline-block px-8 py-4">
              <p className="text-slate-400 text-sm">
                Secured by <span className="text-white font-medium">$10M+</span> in RWA Treasury
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
