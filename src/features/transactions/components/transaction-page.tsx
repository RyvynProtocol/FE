'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactionHistory } from '../hooks/use-transaction-history';
import TransactionTable from './transaction-table';
import TransactionFiltersComponent from './transaction-filters';
import { TransactionFilters } from '../types';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function TransactionPage() {
  const { address, isConnected } = useAccount();
  const [filters, setFilters] = useState<TransactionFilters>({ type: 'all' });
  const { transactions, isLoading, refetch } = useTransactionHistory(filters);

  const handleRefresh = () => {
    refetch();
  };

  if (!isConnected) {
    return (
      <PageContainer>
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Connect Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Please connect your wallet to view your transaction history.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-6 py-8">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Transaction History
            </h1>
            <p className="text-muted-foreground mt-2">
              View all your ryUSD transactions including mints, claims, and
              transfers.
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <TransactionFiltersComponent onFiltersChange={setFilters} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{transactions.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Mints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {transactions.filter((tx) => tx.type === 'mint').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {transactions.filter((tx) => tx.type === 'claim').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionTable transactions={transactions} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
