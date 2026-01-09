'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import type { Transaction, TransactionFilters } from '../types';

export function useTransactionHistory() {
  const { user } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demo - In production, this would fetch from blockchain/backend
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      hash: '0x1234...5678',
      type: 'mint',
      status: 'success',
      amount: '1000',
      token: 'ryUSD',
      to: user?.wallet?.address || '0x1234...5678',
      timestamp: Date.now() - 3600000,
      blockNumber: 12345678,
      gasUsed: '0.0021',
    },
    {
      id: '2',
      hash: '0x8765...4321',
      type: 'transfer',
      status: 'success',
      amount: '500',
      token: 'ryUSD',
      from: user?.wallet?.address || '0x1234...5678',
      to: '0xabcd...efgh',
      timestamp: Date.now() - 7200000,
      blockNumber: 12345600,
      gasUsed: '0.0018',
    },
    {
      id: '3',
      hash: '0xabcd...1234',
      type: 'claim',
      status: 'success',
      amount: '25.5',
      token: 'ryUSD',
      to: user?.wallet?.address || '0x1234...5678',
      timestamp: Date.now() - 86400000,
      blockNumber: 12340000,
      gasUsed: '0.0015',
    },
    {
      id: '4',
      hash: '0xdef0...9876',
      type: 'mint',
      status: 'pending',
      amount: '2000',
      token: 'ryUSD',
      to: user?.wallet?.address || '0x1234...5678',
      timestamp: Date.now() - 300000,
    },
    {
      id: '5',
      hash: '0x9876...fedc',
      type: 'transfer',
      status: 'failed',
      amount: '100',
      token: 'ryUSD',
      from: user?.wallet?.address || '0x1234...5678',
      to: '0xfedc...9876',
      timestamp: Date.now() - 172800000,
      blockNumber: 12330000,
    },
  ];

  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [filters, setFilters] = useState<TransactionFilters>({});

  const filteredTransactions = transactions.filter(tx => {
    if (filters.type && tx.type !== filters.type) return false;
    if (filters.status && tx.status !== filters.status) return false;
    if (filters.startDate && tx.timestamp < filters.startDate) return false;
    if (filters.endDate && tx.timestamp > filters.endDate) return false;
    return true;
  });

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    filters,
    setFilters,
    isLoading,
    isConnected: !!user?.wallet?.address,
  };
}
