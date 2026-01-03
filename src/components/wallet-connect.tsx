'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect } from 'react';

export function WalletConnect() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  const connectedWallet = wallets[0];

  useEffect(() => {
    if (authenticated && connectedWallet) {
      console.log('Connected wallet:', connectedWallet.address);
    }
  }, [authenticated, connectedWallet]);

  const handleLogin = async () => {
    if (!ready) return;
    await login();
  };

  const handleLogout = async () => {
    await logout();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!ready) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-gray-600 text-white rounded-lg cursor-not-allowed flex items-center justify-center"
      >
        Loading...
      </button>
    );
  }

  if (authenticated && connectedWallet) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
          <span className="text-indigo-300 font-mono text-sm">
            {formatAddress(connectedWallet.address)}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
    >
      Connect Wallet
    </button>
  );
}
