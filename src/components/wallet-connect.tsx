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
        className="flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-white"
      >
        Loading...
      </button>
    );
  }

  if (authenticated && connectedWallet) {
    return (
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-indigo-500/30 bg-indigo-600/20 px-4 py-2">
          <span className="font-mono text-sm text-indigo-300">
            {formatAddress(connectedWallet.address)}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
    >
      Connect Wallet
    </button>
  );
}
