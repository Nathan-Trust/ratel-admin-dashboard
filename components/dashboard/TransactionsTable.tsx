"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CustomTable from "@/components/shared/CustomTable";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { TransactionDetailsModal } from "@/components/transactions/transaction-details-modal";
import { useRecentTransactions } from "@/hooks/use-transactions";
import { Transaction, TransactionStatusCode } from "@/models/admin";

const getStatusLabel = (
  status: TransactionStatusCode,
): "Cancelled" | "Pending" | "Processing" | "Completed" => {
  const statusMap: Record<
    TransactionStatusCode,
    "Cancelled" | "Pending" | "Processing" | "Completed"
  > = {
    0: "Cancelled",
    1: "Pending",
    2: "Processing",
    3: "Completed",
  };
  return statusMap[status] || "Pending";
};

const getStatusElement = (status: TransactionStatusCode) => {
  const statusLabel = getStatusLabel(status);
  return (
    <span
      className={cn(
        "text-sm font-medium font-montserrat",
        statusLabel === "Cancelled" && "text-red-failed",
        statusLabel === "Pending" && "text-orange-pending",
        statusLabel === "Processing" && "text-blue-500",
        statusLabel === "Completed" && "text-green-success",
      )}
    >
      {statusLabel}
    </span>
  );
};

const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  return `${formattedDate} - ${formattedTime}`;
};

export function TransactionsTable() {
  const router = useRouter();
  const { data, isLoading } = useRecentTransactions();
  const recentTransactions = data?.data?.items || [];
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction({
      ...transaction,
      status: getStatusLabel(transaction.status as TransactionStatusCode),
      dateTime: formatDateTime(transaction.createdAt),
    });
    setIsDetailsOpen(true);
  };

  const headers = [
    "INVOICE ID",
    // "USER NAME",
    // "GIFT CARD TYPE",
    "COUNTRY",
    "PROVIDER",
    "AMOUNT",
    "STATUS",
    "ACTIONS",
  ];

  const headerKeyMap = {
    "INVOICE ID": "id",
    // "USER NAME": "userName",
    // "GIFT CARD TYPE": "giftCardType",
    COUNTRY: "country",
    PROVIDER: "provider",
    AMOUNT: "amount",
    STATUS: "status",
    ACTIONS: "actions",
  };

  const transactions: Record<string, React.ReactNode>[] =
    recentTransactions.map((t: Transaction) => ({
      id: t.id,
      userName: t.user?.id ? (
        <Link
          href={`/users/${t.user.id}`}
          className="text-teal hover:underline font-medium"
        >
          {t.user?.name || "N/A"}
        </Link>
      ) : (
        t.user?.name || "N/A"
      ),
      giftCardType: t.package || "N/A",
      country: t.country || "N/A",
      provider: t.provider || "gloe-sim",
      amount: formatCurrency(t.amount),
      status: getStatusElement(t.status as TransactionStatusCode),
      actions: (
        <button
          onClick={() => handleViewTransaction(t)}
          className="px-3 py-1.5 rounded-xl border border-[#8C8C8C] bg-teal text-white text-sm font-semibold font-montserrat hover:bg-teal/90 transition-colors"
        >
          View
        </button>
      ),
    }));

  return (
    <>
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={
          <CustomTableSkeleton
            title="Transactions"
            headers={headers}
            rows={5}
            showViewAll={true}
          />
        }
        data={transactions.length}
        emptyState={
          <p className="text-center text-gray-500 py-8">
            No recent transactions
          </p>
        }
      >
        <CustomTable
          title="Transactions"
          headers={headers}
          data={transactions}
          headerKeyMap={headerKeyMap}
          showViewAll={true}
          onViewAll={() => router.push("/transactions")}
        />
      </FetchLoadingAndEmptyState>

      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
      />
    </>
  );
}
