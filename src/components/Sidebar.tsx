'use client';

import {
  ArrowLeftRight,
  Coins,
  Home,
  Menu,
  TrendingUp,
  Vault,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
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
        className="glass-card fixed left-6 top-6 z-50 rounded-lg p-2 text-white md:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`glass-card fixed left-0 top-0 z-40 flex h-screen w-64 flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}
      >
        {/* Logo */}
        <div className="border-b border-slate-700/50 p-6">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Ryvyn Logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Ryvyn</h1>
              <p className="text-xs text-slate-400">Yield-Backed Stablecoin</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? 'border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                } `}
              >
                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Wallet Connect at Bottom */}
        <div className="border-t border-slate-700/50 p-4">
          <WalletConnect />
        </div>
      </aside>
    </>
  );
}
