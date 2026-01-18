import { User } from "./auth";

// Transaction Types
export type TransactionStatusCode = 0 | 1 | 2 | 3;

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  amountPaid: number;
  balanceBefore: string;
  balanceAfter: string;
  title: string;
  recipient: string;
  usdAmount: string;
  provider?: string;
  package: string;
  image: string;
  productId: string;
  reloadlyId: string | null;
  quantity: string;
  preOrder: string;
  status: number;
  type: number;
  country: string;
  response: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface TransactionOverview {
  activeUsers: number;
  thisWeekTx: number;
  thisWeekTxCount: number;
  todayTx: number;
  todayTxCount: number;
  totalTx: number;
  totalTxCount: number;
  totalUserBalance: string;
  totalUsers: number;
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: {
      count: number;
      total: number;
      nextPage: number | null;
      currentPage: number;
    };
  };
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  data: Transaction;
}

export interface TransactionOverviewResponse {
  success: boolean;
  message: string;
  data: TransactionOverview;
}

export interface RecentTransactionsResponse {
  success: boolean;
  message: string;
  data: {
    items: Transaction[];
  };
}

// User Types
export interface AdminUser extends User {
  noOfPurchases?: number;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    pagination: {
      count: number;
      total: number;
      nextPage: number | null;
      currentPage: number;
    };
  };
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: AdminUser[];
}

export interface BanUserResponse {
  success: boolean;
  message: string;
  data: AdminUser;
}

// User Banks
export interface UserBank {
  id: string;
  accountName: string;
  accountNumber: string;
  userId: string;
  bankCode: string;
  bankName: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface UserBanksResponse {
  success: boolean;
  message: string;
  data: UserBank[][];
}

// User Wallets
export interface UserWallet {
  id: string;
  userId: string;
  image: string;
  coinId: string;
  qrCode: string;
  coin: string;
  symbol: string;
  address: string;
  walletId: string;
  balance: number;
  provider: string;
  status: number;
  createdAt: string;
  response: string;
}

export interface UserWalletsResponse {
  success: boolean;
  message: string;
  data: UserWallet[];
}

// Query Params
export interface TransactionsParams {
  page?: number;
  transactionId?: string;
  status?: TransactionStatusCode;
  from?: string;
  to?: string;
}

export interface UsersParams {
  page?: number;
  email?: string;
}

export interface ExportTransactionsParams {
  from: string;
  to: string;
  status?: TransactionStatusCode;
}
