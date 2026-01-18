"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import CustomTable from "@/components/shared/CustomTable";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { useRecentTransactions } from "@/hooks/use-transactions";
import { Transaction, TransactionStatusCode } from "@/models/admin";

const getStatusLabel = (
  status: TransactionStatusCode
): "Pending" | "Success" | "Failed" => {
  const statusMap: Record<
    TransactionStatusCode,
    "Pending" | "Success" | "Failed"
  > = {
    0: "Pending",
    1: "Success",
    2: "Failed",
    3: "Failed",
  };
  return statusMap[status] || "Pending";
};

const getStatusElement = (status: TransactionStatusCode) => {
  const statusLabel = getStatusLabel(status);
  return (
    <span
      className={cn(
        "text-sm font-medium font-montserrat",
        statusLabel === "Pending" && "text-orange-pending",
        statusLabel === "Success" && "text-green-success",
        statusLabel === "Failed" && "text-red-failed"
      )}
    >
      {statusLabel}
    </span>
  );
};

const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

export function TransactionsTable() {
  const router = useRouter();
  const { data, isLoading } = useRecentTransactions();
  const recentTransactions = data?.data?.items || [];

  const headers = [
    "INVOICE ID",
    "USER NAME",
    "GIFT CARD TYPE",
    "COUNTRY",
    "AMOUNT",
    "STATUS",
    "ACTIONS",
  ];

  const headerKeyMap = {
    "INVOICE ID": "id",
    "USER NAME": "userName",
    "GIFT CARD TYPE": "giftCardType",
    COUNTRY: "country",
    AMOUNT: "amount",
    STATUS: "status",
    ACTIONS: "actions",
  };

  const transactions: Record<string, React.ReactNode>[] =
    recentTransactions.map((t: Transaction) => ({
      id: t.id,
      userName: t.user?.name || "N/A",
      giftCardType: t.package || "N/A",
      country: t.country || "N/A",
      amount: formatCurrency(t.amount),
      status: getStatusElement(t.status as TransactionStatusCode),
      actions: (
        <button className="px-3 py-1.5 rounded-xl border border-[#8C8C8C] bg-teal text-white text-sm font-semibold font-montserrat hover:bg-teal/90 transition-colors">
          View
        </button>
      ),
    }));

  return (
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
        <p className="text-center text-gray-500 py-8">No recent transactions</p>
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
  );
}
