'use client';

import React from 'react';
import { Award, Star, Crown, Gem } from 'lucide-react';

type TierLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

interface Tier {
  name: string;
  level: TierLevel;
  icon: any;
  multiplier: string;
  requirement: string;
  color: string;
  gradient: string;
}

export default function TierCard() {
  const tiers: Tier[] = [
    {
      name: 'Bronze',
      level: 'bronze',
      icon: Award,
      multiplier: '1.0x',
      requirement: 'Starting tier',
      color: 'text-orange-400',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      name: 'Silver',
      level: 'silver',
      icon: Star,
      multiplier: '1.2x',
      requirement: '50 transfers or 10K volume',
      color: 'text-slate-300',
      gradient: 'from-slate-400 to-slate-600'
    },
    {
      name: 'Gold',
      level: 'gold',
      icon: Crown,
      multiplier: '1.5x',
      requirement: '200 transfers or 50K volume',
      color: 'text-yellow-400',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      name: 'Platinum',
      level: 'platinum',
      icon: Gem,
      multiplier: '2.0x',
      requirement: 'Top 1% users',
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const currentTier = 'silver';
  const currentTransfers = 67;
  const currentVolume = 15430;
  const nextTierTransfers = 200;
  const nextTierVolume = 50000;

  const transferProgress = (currentTransfers / nextTierTransfers) * 100;
  const volumeProgress = (currentVolume / nextTierVolume) * 100;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Your Tier Progress</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-500/20 border border-slate-500/30 rounded-lg">
          <Star className="w-4 h-4 text-slate-300" />
          <span className="text-sm font-medium text-slate-300">Silver Tier</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-500/10 to-slate-600/10 border border-slate-500/20 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center glow">
            <Star className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Silver Tier</h3>
            <p className="text-slate-400">1.2x reward multiplier</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-300">Transfer Progress</span>
              <span className="text-white font-medium">{currentTransfers} / {nextTierTransfers}</span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${Math.min(transferProgress, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-300">Volume Progress</span>
              <span className="text-white font-medium">${currentVolume.toLocaleString()} / ${nextTierVolume.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${Math.min(volumeProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <p className="text-sm text-slate-400">
            Complete either requirement to unlock <span className="text-yellow-400 font-medium">Gold Tier</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-400 mb-3">All Tiers</h3>

        {tiers.map((tier, index) => {
          const isActive = tier.level === currentTier;
          const isPassed = tiers.findIndex(t => t.level === currentTier) > index;
          const Icon = tier.icon;

          return (
            <div
              key={tier.level}
              className={`
                border rounded-lg p-4 transition-all
                ${isActive ? 'bg-slate-800/50 border-slate-500/50 scale-[1.02]' : ''}
                ${isPassed ? 'bg-slate-800/30 border-slate-700/30' : ''}
                ${!isActive && !isPassed ? 'bg-slate-900/30 border-slate-800/30 opacity-60' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.gradient} flex items-center justify-center ${isActive ? 'glow' : ''}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${tier.color}`}>{tier.name}</p>
                    <p className="text-xs text-slate-400">{tier.requirement}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{tier.multiplier}</p>
                  <p className="text-xs text-slate-400">Multiplier</p>
                </div>
              </div>

              {isActive && (
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    Current Tier
                  </div>
                </div>
              )}

              {isPassed && (
                <div className="mt-3 pt-3 border-t border-slate-700/50">
                  <p className="text-sm text-slate-500">✓ Unlocked</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
