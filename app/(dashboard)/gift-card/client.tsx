"use client";

import { useState } from "react";
import CustomTable from "@/components/shared/CustomTable";
import { GiftCardDetails } from "@/components/gift-card/gift-card-details";
import CustomHeader from "@/components/shared/CustomHeader";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { Eye } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { Transaction } from "@/models/admin";

interface GiftCardTransaction {
  id: string;
  giftCardName: string;
  country: string;
  recipient: string;
  dateAdded: string;
  amount: string;
  status: React.ReactNode;
  actions: React.ReactNode;
}

const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-");
};

const getStatusBadge = (status: number) => {
  const statusMap: Record<number, { label: string; className: string }> = {
    0: {
      label: "Pending",
      className: "bg-orange-pending/10 text-orange-pending",
    },
    1: { label: "Success", className: "bg-teal/10 text-teal" },
    2: { label: "Failed", className: "bg-red/10 text-red" },
    3: { label: "Failed", className: "bg-red/10 text-red" },
  };
  const statusInfo = statusMap[status] || {
    label: "Unknown",
    className: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}
    >
      {statusInfo.label}
    </span>
  );
};

const GiftCardClient = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page] = useState(1);

  // Use transactions hook - gift card purchases are stored as transactions with type: 1
  const { data, isLoading } = useTransactions({ page });

  // Filter transactions to only show gift card transactions (type: 1)
  const transactionsData = (data?.data?.transactions || []).filter(
    (tx: Transaction) => tx.type === 1
  );

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  const filteredData = searchQuery
    ? transactionsData.filter(
        (tx: Transaction) =>
          tx.package?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.country?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactionsData;

  const giftCardTransactions: GiftCardTransaction[] = filteredData.map(
    (tx: Transaction) => ({
      id: tx.id,
      giftCardName: tx.package || "Unknown",
      country: tx.country || "N/A",
      recipient: tx.recipient || "N/A",
      dateAdded: formatDate(tx.createdAt),
      amount: formatCurrency(Number(tx.amount) || 0),
      status: getStatusBadge(tx.status),
      actions: (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleViewTransaction(tx)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal/10 text-teal hover:bg-teal hover:text-white transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      ),
    })
  );

  const headers = [
    "GIFT CARD",
    "COUNTRY",
    "RECIPIENT",
    "DATE",
    "AMOUNT",
    "STATUS",
    "ACTIONS",
  ];

  const headerKeyMap = {
    "GIFT CARD": "giftCardName",
    COUNTRY: "country",
    RECIPIENT: "recipient",
    DATE: "dateAdded",
    AMOUNT: "amount",
    STATUS: "status",
    ACTIONS: "actions",
  };

  return (
    <main className="w-full max-w-[1100px] pb-6">
      <CustomHeader header="Gift Card Transactions" />

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search gift cards..."
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
        contentClassName="block"
        skeleton={
          <CustomTableSkeleton headers={headers} rows={8} showViewAll={false} />
        }
        data={giftCardTransactions.length}
        emptyState={
          <p className="text-center text-gray-500 py-8">
            No gift card transactions found
          </p>
        }
      >
        <CustomTable
          headers={headers}
          data={giftCardTransactions as never}
          headerKeyMap={headerKeyMap}
          showViewAll={false}
        />
      </FetchLoadingAndEmptyState>

      <GiftCardDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        card={
          selectedTransaction
            ? {
                giftCardName: selectedTransaction.package || "Unknown",
                country: selectedTransaction.country || "N/A",
                noOfPurchases: Number(selectedTransaction.quantity) || 1,
                dateAdded: formatDate(selectedTransaction.createdAt),
                price: formatCurrency(Number(selectedTransaction.amount) || 0),
                status: selectedTransaction.status,
                image: selectedTransaction.image || "",
              }
            : null
        }
      />
    </main>
  );
};

export default GiftCardClient;
