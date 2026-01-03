'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ArrowLeftRight, TrendingUp, Vault, Menu, X, Coins } from 'lucide-react';
import { WalletConnect } from './wallet-connect';

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Coins, label: 'Mint', href: '/mint' },
    { icon: ArrowLeftRight, label: 'Transfer', href: '/transfer' },
    { icon: TrendingUp, label: 'Yield Bonds', href: '/stream-bonds' },
    { icon: Vault, label: 'Treasury', href: '/treasury' },
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
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Ryvyn Logo" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-white">Ryvyn</h1>
              <p className="text-xs text-slate-400">Yield-Backed Stablecoin</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all group
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }
                `}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connect at Bottom */}
        <div className="p-4 border-t border-slate-700/50">
          <WalletConnect />
        </div>
      </aside>
    </>
  );
}
