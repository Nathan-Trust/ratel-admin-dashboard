"use client";

import { useState } from "react";
import CustomTable from "@/components/shared/CustomTable";
import { TransactionDetailsModal } from "@/components/transactions/transaction-details-modal";
import CustomHeader from "@/components/shared/CustomHeader";
import { getTransactionStatusColor, TransactionStatus } from "@/lib/utils";

interface Transaction {
  id: string;
  userName: string;
  giftCardType: string;
  country: string;
  amount: string;
  status: TransactionStatus;
  dateTime: string;
  actions: React.ReactNode;
}

const getStatusElement = (status: TransactionStatus) => (
  <span
    className={`text-sm font-medium font-montserrat ${getTransactionStatusColor(
      status
    )}`}
  >
    {status}
  </span>
);

const TransactionClient = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const rawTransactions = [
    {
      id: "1",
      userName: "Ben Ben",
      giftCardType: "Amazon",
      country: "USA",
      provider: "Reloadly",
      amount: "₦18,000",
      status: "Pending" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
    {
      id: "2",
      userName: "Tom Ben",
      giftCardType: "Google",
      country: "USA",
      provider: "Reloadly",
      amount: "₦12,500",
      status: "Success" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
    {
      id: "3",
      userName: "Anita John",
      giftCardType: "Apple",
      country: "USA",
      provider: "Reloadly",
      amount: "₦15,700",
      status: "Failed" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
    {
      id: "4",
      userName: "Vicky James",
      giftCardType: "Google",
      country: "USA",
      provider: "Reloadly",
      amount: "₦22,000",
      status: "Pending" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
    {
      id: "5",
      userName: "Esther Esther",
      giftCardType: "Apple",
      country: "USA",
      provider: "Reloadly",
      amount: "₦19,300",
      status: "Success" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
    {
      id: "6",
      userName: "Adore Tom",
      giftCardType: "Google",
      country: "USA",
      provider: "Reloadly",
      amount: "₦14,200",
      status: "Failed" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
    {
      id: "7",
      userName: "Grace John",
      giftCardType: "Apple",
      country: "USA",
      provider: "Reloadly",
      amount: "₦16,800",
      status: "Success" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
    {
      id: "8",
      userName: "Princess Joy",
      giftCardType: "Amazon",
      country: "USA",
      provider: "Reloadly",
      amount: "₦20,100",
      status: "Failed" as TransactionStatus,
      dateTime: "22/11/2025 - 11:23pm",
    },
  ];

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  const transactions: any[] = rawTransactions.map((t) => ({
    ...t,
    status: getStatusElement(t.status),
    actions: (
      <button
        onClick={() => handleViewTransaction(t)}
        className="px-3 py-1.5 rounded-xl border border-[#8C8C8C] bg-teal text-white text-sm font-semibold font-montserrat hover:bg-teal/90 transition-colors"
      >
        View
      </button>
    ),
  }));

  const headers = [
    "USER NAME",
    "GIFT CARD TYPE",
    "COUNTRY",
    "PROVIDER",
    "AMOUNT",
    "STATUS",
    "ACTIONS",
  ];

  const headerKeyMap = {
    "USER NAME": "userName",
    "GIFT CARD TYPE": "giftCardType",
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

      <CustomTable
        headers={headers}
        data={transactions}
        headerKeyMap={headerKeyMap}
        showViewAll={false}
      />

      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
      />
    </main>
  );
};

export default TransactionClient;
