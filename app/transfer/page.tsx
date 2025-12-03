'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MintUSDCB from '@/components/MintUSDCB';
import TransferUSDCB from '@/components/TransferUSDCB';
import { Coins, Send } from 'lucide-react';

export default function TransferPage() {
  const [activeTab, setActiveTab] = useState<'mint' | 'transfer'>('mint');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      <Sidebar />

      <div className="relative z-10 md:ml-64">
        <main className="max-w-6xl mx-auto px-6 py-8 pb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Transfer & Mint</h1>
            <p className="text-slate-400">Mint USDC-B and transfer to earn rewards</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 glass-card p-2 w-fit">
            <button
              onClick={() => setActiveTab('mint')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${activeTab === 'mint'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }
              `}
            >
              <Coins className="w-5 h-5" />
              Mint USDC-B
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${activeTab === 'transfer'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }
              `}
            >
              <Send className="w-5 h-5" />
              Transfer USDC-B
            </button>
          </div>

          {/* Content */}
          {activeTab === 'mint' ? <MintUSDCB /> : <TransferUSDCB />}
        </main>
      </div>
    </div>
  );
}
