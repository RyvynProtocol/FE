'use client';

import { PageContainer } from '@/components/page-container';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useTransactionHistory } from '../hooks/use-transaction-history';
import type { TransactionStatus, TransactionType } from '../types';
import TransactionList from './transaction-list';

export default function TransactionPage() {
  const { transactions, filters, setFilters, isLoading, isConnected } =
    useTransactionHistory();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="grid min-h-[calc(100vh-200px)] grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!isConnected) {
    return (
      <PageContainer>
        <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Connect Your Wallet
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-lg">
            Please connect your wallet to view your transaction history
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="]">
        <div className="flex flex-col justify-center space-y-6 py-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight uppercase sm:text-6xl lg:text-7xl">
              TRANSACTION{' '}
              <span className="text-muted-foreground">HISTORY.</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg font-medium md:text-xl">
              Track all your on-chain activities. Complete transparency for
              every mint, transfer, and claim.
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Transaction List */}
      <div className="space-y-6 pb-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Transaction Type Dropdown */}
          <div className="relative">
            <select
              value={filters.type || 'all'}
              onChange={e =>
                setFilters({
                  ...filters,
                  type: e.target.value === 'all' ? undefined : (e.target.value as TransactionType),
                })
              }
              className="appearance-none rounded-lg bg-[#D4C5B0] px-4 py-2 pr-10 text-sm font-medium text-[#1C3A2E] transition-colors hover:bg-[#C9BAA5] focus:outline-none focus:ring-2 focus:ring-[#1C3A2E]/20"
            >
              <option value="all">All Transactions</option>
              <option value="mint">Mint</option>
              <option value="transfer">Transfer</option>
              <option value="claim">Claim</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-4 w-4 text-[#1C3A2E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={filters.status || 'all'}
              onChange={e =>
                setFilters({
                  ...filters,
                  status: e.target.value === 'all' ? undefined : (e.target.value as TransactionStatus),
                })
              }
              className="appearance-none rounded-lg bg-[#D4C5B0] px-4 py-2 pr-10 text-sm font-medium text-[#1C3A2E] transition-colors hover:bg-[#C9BAA5] focus:outline-none focus:ring-2 focus:ring-[#1C3A2E]/20"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-4 w-4 text-[#1C3A2E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <TransactionList transactions={transactions} />
      </div>
    </PageContainer>
  );
}
