'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  address: string;
  reward: string;
  timestamp: string;
  status: 'completed' | 'pending';
}

export default function TransactionHistory() {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'send',
      amount: '1,000',
      address: '0x7a8f...2d9e',
      reward: '0.50',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'receive',
      amount: '500',
      address: '0x3c1a...8b4f',
      reward: '0.25',
      timestamp: '5 hours ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'send',
      amount: '2,500',
      address: '0x9d2e...7f3a',
      reward: '1.25',
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'receive',
      amount: '750',
      address: '0x4b8c...1e6d',
      reward: '0.38',
      timestamp: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${tx.type === 'send'
                    ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30'
                    : 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30'}
                `}>
                  {tx.type === 'send'
                    ? <ArrowUpRight className="w-5 h-5 text-red-400" />
                    : <ArrowDownLeft className="w-5 h-5 text-green-400" />
                  }
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {tx.type === 'send' ? 'Sent to' : 'Received from'} {tx.address}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{tx.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className={`text-sm font-bold ${tx.type === 'send' ? 'text-red-400' : 'text-green-400'}`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} USDC-B
                </p>
                <p className="text-xs text-purple-400 mt-1">
                  +{tx.reward} Stream Bonds
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-slate-400 capitalize">{tx.status}</span>
              </div>
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
