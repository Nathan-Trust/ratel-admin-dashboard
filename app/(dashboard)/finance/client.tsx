"use client";

import { useRouter } from "next/navigation";
import CustomHeader from "@/components/shared/CustomHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/finance/RevenueChart";
import CustomTable from "@/components/shared/CustomTable";
import { RevenuePieChart } from "@/components/finance/RevenuePieChart";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useTransactionOverview,
  useTransactions,
} from "@/hooks/use-transactions";
import { Transaction } from "@/models/admin";

const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

const FinanceClient = () => {
  const router = useRouter();

  // Use transaction overview for stats (contains totalRevenue, etc.)
  const { data: overviewData, isLoading: isLoadingOverview } =
    useTransactionOverview();
  // Use transactions to calculate revenue breakdown by gift card
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useTransactions();

  const overview = overviewData?.data;
  const transactions = transactionsData?.data?.transactions || [];

  // Calculate revenue breakdown by grouping transactions by package (gift card name)
  const revenueByGiftCard = transactions.reduce(
    (
      acc: Record<string, { purchases: number; totalRevenue: number }>,
      tx: Transaction
    ) => {
      const giftCard = tx.package || "Unknown";
      if (!acc[giftCard]) {
        acc[giftCard] = { purchases: 0, totalRevenue: 0 };
      }
      acc[giftCard].purchases += 1;
      acc[giftCard].totalRevenue += Number(tx.amount) || 0;
      return acc;
    },
    {}
  );

  const revenueBreakdownData = Object.entries(revenueByGiftCard)
    .slice(0, 5) // Show top 5
    .map(([giftCard, data]) => ({
      giftCard,
      purchases: String(data.purchases),
      totalRevenue: formatCurrency(data.totalRevenue),
    }));

  const headers = ["GIFT CARD", "PURCHASES", "TOTAL REVENUE"];
  const headerKeyMap = {
    "GIFT CARD": "giftCard",
    PURCHASES: "purchases",
    "TOTAL REVENUE": "totalRevenue",
  };

  const handleViewAll = () => {
    router.push("/finance/revenue-breakdown");
  };

  return (
    <main className="w-full max-w-[1100px] pb-6">
      <CustomHeader header="Finance" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <FetchLoadingAndEmptyState
          isLoading={isLoadingOverview}
          numberOfSkeleton={1}
          skeleton={
            <>
              <Skeleton className="h-[120px] rounded-3xl" />
              <Skeleton className="h-[120px] rounded-3xl" />
              <Skeleton className="h-[120px] rounded-3xl" />
            </>
          }
          data={overview ? 1 : 0}
          emptyState={null}
        >
          <>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(overview?.totalTx || 0).replace(
                "₦",
                ""
              )}
              percentage="+60%"
            />
            <StatCard
              title="Total Transactions"
              value={String(overview?.totalTxCount || 0)}
              percentage="+30%"
            />
            <StatCard
              title="Successful"
              value={String(overview?.todayTxCount || 0)}
              percentage="+90%"
            />
          </>
        </FetchLoadingAndEmptyState>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue and Profit Chart */}
        <div className="bg-white rounded-3xl p-6 border border-grey-border shadow-sm">
          <h3 className="text-base font-semibold font-montserrat text-[#1F1F1F] mb-4">
            Revenue and Profit
          </h3>
          <RevenueChart />
        </div>

        {/* Revenue Pie Chart */}
        <div className="bg-white rounded-3xl p-6 border border-grey-border shadow-sm">
          <h3 className="text-base font-semibold font-montserrat text-[#1F1F1F] mb-4">
            Revenue
          </h3>
          <RevenuePieChart />
        </div>
      </div>

      {/* Revenue Breakdown Table */}
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold font-montserrat text-[#1F1F1F]">
            Revenue Breakdown
          </h3>
          <button
            onClick={handleViewAll}
            className="text-sm font-medium font-montserrat text-teal hover:text-teal/80 transition-colors"
          >
            View all
          </button>
        </div>
        <FetchLoadingAndEmptyState
          isLoading={isLoadingTransactions}
          numberOfSkeleton={1}
          skeleton={
            <CustomTableSkeleton
              headers={headers}
              rows={3}
              showViewAll={false}
            />
          }
          data={revenueBreakdownData.length}
          emptyState={
            <p className="text-center text-gray-500 py-4">
              No revenue data available
            </p>
          }
        >
          <CustomTable
            headers={headers}
            data={revenueBreakdownData as any}
            headerKeyMap={headerKeyMap}
            showViewAll={false}
          />
        </FetchLoadingAndEmptyState>
      </div>
    </main>
  );
};

export default FinanceClient;
