'use client';

import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight, Check, Clock, X } from 'lucide-react';
import type { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

function getTransactionIcon(type: TransactionType) {
  switch (type) {
    case 'mint':
      return <ArrowDownRight className="h-5 w-5" />;
    case 'transfer':
      return <ArrowUpRight className="h-5 w-5" />;
    case 'claim':
      return <ArrowDownRight className="h-5 w-5" />;
    case 'stake':
      return <ArrowDownRight className="h-5 w-5" />;
    case 'unstake':
      return <ArrowUpRight className="h-5 w-5" />;
    default:
      return <ArrowDownRight className="h-5 w-5" />;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'success':
      return <Check className="h-4 w-4 text-green-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'failed':
      return <X className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function groupTransactionsByDate(transactions: Transaction[]) {
  const groups: { [key: string]: Transaction[] } = {};

  transactions.forEach(tx => {
    const dateKey = formatDate(tx.timestamp);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(tx);
  });

  return groups;
}

function shortenAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-secondary/50 flex flex-col items-center justify-center rounded-lg p-12 text-center">
        <p className="text-muted-foreground text-lg">No transactions found</p>
        <p className="text-muted-foreground/60 mt-2 text-sm">
          Your transaction history will appear here
        </p>
      </div>
    );
  }

  const groupedTransactions = groupTransactionsByDate(transactions);
  const dateKeys = Object.keys(groupedTransactions).sort((a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return dateB - dateA; // Sort descending (newest first)
  });

  return (
    <div className="space-y-8">
      {dateKeys.map(dateKey => (
        <div key={dateKey} className="space-y-3">
          {/* Date Header */}
          <h2 className="text-xl font-bold text-[#1C3A2E]">{dateKey}</h2>

          {/* Transactions for this date */}
          <div className="space-y-3">
            {groupedTransactions[dateKey].map(tx => (
              <div
                key={tx.id}
                className="group rounded-lg bg-[#D4C5B0] p-4 transition-colors hover:bg-[#C9BAA5]"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Icon & Type */}
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C3A2E]/10 text-[#1C3A2E]">
                      {getTransactionIcon(tx.type)}
                    </div>

                    {/* Type & Details */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold capitalize text-[#1C3A2E]">
                          {tx.type}
                        </h3>
                        {getStatusIcon(tx.status)}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#1C3A2E]/70">
                        <span>{formatTimestamp(tx.timestamp)}</span>
                        {tx.to && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-xs">
                              To: {shortenAddress(tx.to)}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="font-mono text-xs text-[#1C3A2E]/60">{tx.hash}</p>

                      {tx.blockNumber && (
                        <p className="text-xs text-[#1C3A2E]/50">
                          Block: {tx.blockNumber.toLocaleString()}
                          {tx.gasUsed && ` • Gas: ${tx.gasUsed} ETH`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Amount & Status */}
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-lg font-semibold text-[#1C3A2E]">
                      {tx.type === 'transfer' && tx.from ? '-' : '+'}{' '}
                      {parseFloat(tx.amount).toLocaleString()} {tx.token}
                    </p>
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium uppercase',
                        tx.status === 'success' &&
                          'bg-green-100 text-green-700',
                        tx.status === 'pending' &&
                          'bg-yellow-100 text-yellow-700',
                        tx.status === 'failed' && 'bg-red-100 text-red-700'
                      )}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
