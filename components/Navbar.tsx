'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="glass-card mx-6 mt-6 mb-8">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
              B
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">USDC-B</h1>
              <p className="text-xs text-slate-400">Yield-Backed Stablecoin</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Transfer</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Stream Bonds</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Treasury</a>
          </div>

          <div className="flex items-center gap-4">
            <WalletConnect />

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-700 flex flex-col gap-3">
            <a href="#" className="text-slate-300 hover:text-white transition-colors py-2">Dashboard</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors py-2">Transfer</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors py-2">Stream Bonds</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors py-2">Treasury</a>
          </div>
        )}
      </div>
    </nav>
  );
}
