import { useQuery, useMutation } from "@tanstack/react-query";
import { transactionService } from "@/services/transactions";
import { TransactionsParams, ExportTransactionsParams } from "@/models/admin";
import { successToast, errorToast } from "@/util/toast";

const QUERY_KEYS = {
  TRANSACTIONS: "admin-transactions",
  TRANSACTION: "admin-transaction",
  OVERVIEW: "admin-transaction-overview",
  RECENT: "admin-recent-transactions",
};

export const useTransactionOverview = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.OVERVIEW],
    queryFn: () => transactionService.getOverview(),
  });
};

export const useRecentTransactions = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.RECENT],
    queryFn: () => transactionService.getRecentTransactions(),
  });
};

export const useTransactions = (params?: TransactionsParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS, params],
    queryFn: () => transactionService.getTransactions(params),
  });
};

export const useTransaction = (transactionId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTION, transactionId],
    queryFn: () => transactionService.getTransaction(transactionId),
    enabled: !!transactionId,
  });
};

export const useExportTransactions = () => {
  return useMutation({
    mutationFn: (params: ExportTransactionsParams) =>
      transactionService.exportTransactions(params),
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `transactions-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      successToast({ message: "Transactions exported successfully" });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to export transactions.";
      errorToast({ message });
    },
  });
};
