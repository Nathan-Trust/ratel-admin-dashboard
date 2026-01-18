"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import CustomTable from "@/components/shared/CustomTable";
import { TransactionDetailsModal } from "@/components/transactions/transaction-details-modal";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import CustomHeader from "@/components/shared/CustomHeader";
import { getTransactionStatusColor, TransactionStatus } from "@/lib/utils";
import { useTransactions } from "@/hooks/use-transactions";
import { Transaction, TransactionStatusCode } from "@/models/admin";

const getStatusLabel = (status: TransactionStatusCode): TransactionStatus => {
  const statusMap: Record<TransactionStatusCode, TransactionStatus> = {
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
      className={`text-sm font-medium font-montserrat ${getTransactionStatusColor(
        statusLabel,
      )}`}
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

const truncateText = (text: string, maxLength: number = 20) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const TransactionClient = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page] = useState(1);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useTransactions({
    page,
    transactionId: debouncedSearch || undefined,
  });
  const transactionsData = data?.data?.transactions || [];

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction({
      ...transaction,
      status: getStatusLabel(transaction.status as TransactionStatusCode),
      dateTime: formatDateTime(transaction.createdAt),
    });
    setIsDetailsOpen(true);
  };

  const transactions: any[] = transactionsData.map((t: Transaction) => ({
    id: t.id,
    userName: t.userId ? (
      <Link
        href={`/users/${t.userId}`}
        className="text-teal hover:underline font-medium"
      >
        {t.user?.name || t.recipient || "N/A"}
      </Link>
    ) : (
      t.user?.name || t.recipient || "N/A"
    ),
    giftCardType: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {t.image ? (
            <Image
              src={t.image}
              alt={t.package || "Gift card"}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal to-teal-light flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {(t.package || "N")[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-sm">{truncateText(t.package || "N/A", 25)}</span>
      </div>
    ),
    country: t.country || "N/A",
    provider: t.provider || "gloEsim",
    amount: formatCurrency(Number(t.amount)),
    status: getStatusElement(t.status as TransactionStatusCode),
    actions: (
      <button
        onClick={() => handleViewTransaction(t)}
        className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-lg bg-teal/10 text-teal hover:bg-teal hover:text-white transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
    ),
  }));

  const headers = [
    "GIFT CARD TYPE",
    "USER NAME",
    "COUNTRY",
    "PROVIDER",
    "AMOUNT",
    "STATUS",
    "ACTIONS",
  ];

  const headerKeyMap = {
    "GIFT CARD TYPE": "giftCardType",
    "USER NAME": "userName",
    COUNTRY: "country",
    PROVIDER: "provider",
    AMOUNT: "amount",
    STATUS: "status",
    ACTIONS: "actions",
  };

  return (
    <main className="w-full max-w-[1100px] pb-6">
      <CustomHeader header="Transactions" />

      <div className="mb-6">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-grey-border focus:outline-none focus:ring-2 focus:ring-teal/20 text-sm font-montserrat"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8C8C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={
          <CustomTableSkeleton headers={headers} rows={8} showViewAll={false} />
        }
        data={transactions.length}
        emptyState={
          <p className="text-center text-gray-500 py-8">
            No transactions found
          </p>
        }
        contentClassName="block"
      >
        <CustomTable
          headers={headers}
          data={transactions}
          headerKeyMap={headerKeyMap}
          showViewAll={false}
        />
      </FetchLoadingAndEmptyState>

      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
      />
    </main>
  );
};

export default TransactionClient;
