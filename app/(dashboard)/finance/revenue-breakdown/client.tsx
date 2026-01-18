"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import CustomTable from "@/components/shared/CustomTable";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { useTransactions } from "@/hooks/use-transactions";
import { Transaction } from "@/models/admin";

const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

const RevenueBreakdownClient = () => {
  const router = useRouter();
  const { data, isLoading } = useTransactions({ page: 1 });
  const transactions = data?.data?.transactions || [];

  // Group transactions by package name to calculate revenue breakdown
  const revenueByPackage = transactions.reduce(
    (
      acc: Record<string, { purchases: number; totalRevenue: number }>,
      t: Transaction
    ) => {
      const packageName = t.package || "Other";
      if (!acc[packageName]) {
        acc[packageName] = { purchases: 0, totalRevenue: 0 };
      }
      acc[packageName].purchases += 1;
      acc[packageName].totalRevenue += t.amount;
      return acc;
    },
    {}
  );

  const revenueBreakdownData = Object.entries(revenueByPackage).map(
    ([giftCard, data]) => ({
      giftCard,
      purchases: String(data.purchases),
      totalRevenue: formatCurrency(data.totalRevenue),
    })
  );

  const headers = ["GIFT CARD", "PURCHASES", "TOTAL REVENUE"];
  const headerKeyMap = {
    "GIFT CARD": "giftCard",
    PURCHASES: "purchases",
    "TOTAL REVENUE": "totalRevenue",
  };

  return (
    <main className="w-full max-w-[1100px] pb-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#1F1F1F]" />
        </button>
        <h1 className="text-xl font-semibold font-montserrat text-[#1F1F1F]">
          Revenue Breakdown
        </h1>
      </div>

      {/* Revenue Breakdown Table */}
      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={
          <CustomTableSkeleton headers={headers} rows={5} showViewAll={false} />
        }
        data={revenueBreakdownData.length}
        emptyState={
          <p className="text-center text-gray-500 py-8">
            No revenue breakdown data available
          </p>
        }
      >
        <CustomTable
          headers={headers}
          data={revenueBreakdownData}
          headerKeyMap={headerKeyMap}
          showViewAll={false}
        />
      </FetchLoadingAndEmptyState>
    </main>
  );
};

export default RevenueBreakdownClient;
