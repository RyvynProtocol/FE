'use client';

import React from 'react';
import { Home, ArrowLeftRight, TrendingUp, Vault, Menu, X } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: ArrowLeftRight, label: 'Transfer', href: '#' },
    { icon: TrendingUp, label: 'Stream Bonds', href: '#' },
    { icon: Vault, label: 'Treasury', href: '#' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 left-6 z-50 p-2 glass-card rounded-lg text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 glass-card
          flex flex-col
          transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
              B
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">USDC-B</h1>
              <p className="text-xs text-slate-400">Yield-Backed</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Wallet Connect at Bottom */}
        <div className="p-4 border-t border-slate-700/50">
          <WalletConnect />
        </div>
      </aside>
    </>
  );
}
