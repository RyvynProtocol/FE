import { useMemo } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACTS } from '@/config/contracts';
import RyUSDabi from '@/abis/RyUSD.json';
import YieldManagerABI from '@/abis/YieldManager.json';
import { Transaction, TransactionFilters } from '../types';

export function useTransactionHistory(filters?: TransactionFilters) {
  const { address } = useAccount();

  // Fetch mint history from RyUSD contract
  const {
    data: mintHistory,
    isLoading: isLoadingMints,
    refetch: refetchMints,
  } = useReadContract({
    address: CONTRACTS.ryUSD as `0x${string}`,
    abi: RyUSDabi,
    functionName: 'getUserMintHistory',
    args: address ? [address] : undefined,
    chainId: 5003,
    query: {
      enabled: !!address,
    },
  });

  // Parse and combine all transactions
  const transactions: Transaction[] = useMemo(() => {
    if (!address) return [];

    const allTransactions: Transaction[] = [];

    // Parse mint history
    if (mintHistory && Array.isArray(mintHistory)) {
      const mintTxs = mintHistory.map((record: any, index: number) => ({
        id: `mint-${index}`,
        type: 'mint' as const,
        amount: Number(formatUnits(record.amount, 6)),
        timestamp: Number(record.timestamp),
        blockNumber: Number(record.blockNumber),
        txHash: `0x${record.blockNumber.toString(16).padStart(64, '0')}`, // Mock hash from block number
        status: 'success' as const,
      }));
      allTransactions.push(...mintTxs);
    }

    // Sort by timestamp descending (newest first)
    allTransactions.sort((a, b) => b.timestamp - a.timestamp);

    // Apply filters
    let filtered = allTransactions;

    if (filters?.type && filters.type !== 'all') {
      filtered = filtered.filter((tx) => tx.type === filters.type);
    }

    if (filters?.dateFrom) {
      filtered = filtered.filter((tx) => tx.timestamp >= filters.dateFrom!);
    }

    if (filters?.dateTo) {
      filtered = filtered.filter((tx) => tx.timestamp <= filters.dateTo!);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (tx) =>
          tx.txHash.toLowerCase().includes(searchLower) ||
          tx.type.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [mintHistory, address, filters]);

  return {
    transactions,
    isLoading: isLoadingMints,
    refetch: refetchMints,
  };
}
