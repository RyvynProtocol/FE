export type TransactionType = 'mint' | 'transfer' | 'claim' | 'stake' | 'unstake';

export type TransactionStatus = 'pending' | 'success' | 'failed';

export interface Transaction {
  id: string;
  hash: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: string;
  token: string;
  from?: string;
  to?: string;
  timestamp: number;
  blockNumber?: number;
  gasUsed?: string;
}

export interface TransactionFilters {
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: number;
  endDate?: number;
}
