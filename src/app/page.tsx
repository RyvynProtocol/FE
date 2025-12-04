'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      <Sidebar />

      <div className="relative z-10 md:ml-64">
        <main className="max-w-7xl mx-auto px-6 py-8 pb-12">
          <div className="text-center mt-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Welcome to USDC-B</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The first stablecoin that rewards every transaction with real-world asset-backed
              yields
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
