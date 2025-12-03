'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import MintUSDCB from '@/components/MintUSDCB';

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      <Sidebar />

      <div className="relative z-10 md:ml-64">
        <main className="max-w-5xl mx-auto px-6 py-8 pb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Transfer & Mint</h1>
            <p className="text-slate-400">Mint USDC-B and start earning rewards on every transfer</p>
          </div>

          <MintUSDCB />
        </main>
      </div>
    </div>
  );
}
