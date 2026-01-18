import api from "@/lib/api";
import {
  TransactionsResponse,
  TransactionResponse,
  TransactionOverviewResponse,
  RecentTransactionsResponse,
  TransactionsParams,
  ExportTransactionsParams,
} from "@/models/admin";

class TransactionService {
  private readonly basePath = "/v1/admin/transaction";

  // Get transaction overview metrics
  async getOverview(): Promise<TransactionOverviewResponse> {
    const response = await api.get<TransactionOverviewResponse>(
      `${this.basePath}/overview`
    );
    return response.data;
  }

  // Get recent transactions
  async getRecentTransactions(): Promise<RecentTransactionsResponse> {
    const response = await api.get<RecentTransactionsResponse>(
      `${this.basePath}/recent`
    );
    return response.data;
  }

  // List all transactions
  async getTransactions(
    params?: TransactionsParams
  ): Promise<TransactionsResponse> {
    const response = await api.get<TransactionsResponse>(this.basePath, {
      params,
    });
    return response.data;
  }

  // Get single transaction
  async getTransaction(transactionId: string): Promise<TransactionResponse> {
    const response = await api.get<TransactionResponse>(
      `${this.basePath}/${transactionId}`
    );
    return response.data;
  }

  // Export transactions
  async exportTransactions(params: ExportTransactionsParams): Promise<Blob> {
    const response = await api.get(`${this.basePath}/exports/date`, {
      params,
      responseType: "blob",
    });
    return response.data;
  }
}

export const transactionService = new TransactionService();
export default transactionService;
