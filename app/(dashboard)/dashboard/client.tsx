"use client";

import { SalesOverview } from "@/components/dashboard/SalesOverview";
import { SmallStatCard } from "@/components/dashboard/SmallStatCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Header } from "@/components/shared/Header";
import { Users, TrendingUp, Calendar } from "lucide-react";
import { useTransactionOverview } from "@/hooks/use-transactions";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { Skeleton } from "@/components/ui/skeleton";

const formatCurrency = (amount: number) => {
  return `N${amount.toLocaleString()}`;
};

const DashboardClient = () => {
  const { data: overviewData, isLoading: isLoadingOverview } =
    useTransactionOverview();
  const overview = overviewData?.data;

  return (
    <main className="w-full max-w-[1100px] pb-6">
      <Header />

      {/* <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full border border-grey-border flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-[#333]" />
        </div>
        <div className="px-3 py-2 rounded-full border border-grey-border">
          <span className="text-sm font-medium font-montserrat text-[#333]">
            This Month
          </span>
        </div>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4 w-full">
        <FetchLoadingAndEmptyState
          isLoading={isLoadingOverview}
          numberOfSkeleton={1}
          skeleton={
            <>
              <Skeleton className="h-[120px] rounded-3xl" />
              <Skeleton className="h-[120px] rounded-3xl" />
              <Skeleton className="h-[120px] rounded-3xl" />
              <Skeleton className="h-[120px] rounded-3xl" />
            </>
          }
          data={overview ? 1 : 0}
          emptyState={null}
          contentClassName="block"
        >
          <>
            <StatCard
              title="Total Revenue Generated"
              value={formatCurrency(overview?.totalTx || 0)}
              // percentage="12%"
            />
            <StatCard
              title="Active Users"
              value={String(overview?.activeUsers || 0)}
              // percentage="12%"
            />
            <StatCard
              title="Total Transactions"
              value={String(overview?.totalTxCount || 0)}
              // percentage="12%"
            />
            <StatCard
              title="Today Transaction Count"
              value={String(overview?.todayTxCount || 0)}
              // percentage="12%"
            />
          </>
        </FetchLoadingAndEmptyState>
      </div>

      {/* <div className="flex flex-col lg:flex-row gap-3 mb-4 w-full">
        <SalesOverview />

        <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <SmallStatCard
              icon={<Users className="w-6 h-6 text-white" strokeWidth={1.5} />}
              title="New Customers"
              value="50"
              subtitle="Today"
            />
            <SmallStatCard
              icon={
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={1.5} />
              }
              title="Total Profit"
              value="N500,000"
              subtitle="Today"
            />
          </div>
          <div className="w-full lg:w-[408px] h-[150px] rounded-3xl border border-grey-border bg-teal-light relative overflow-hidden">
            <svg
              className="absolute bottom-0 left-0 w-full h-[140px]"
              viewBox="0 0 407 157"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M408 40.4576V157.458H0V93.4576C0 93.4576 12 86.4576 25 88.4576C38 90.4576 27.9997 68.4576 37.9999 63.4576L58.9999 71.4576C58.9999 71.4576 77.9999 45.4576 77.9999 58.4576C77.9999 71.4576 108 35.4576 112.5 30.4576C117 25.4576 163 45.4576 163 45.4576C163 45.4576 171.5 43.4576 179 40.4576C186.5 37.4576 212 6.45761 212 6.45761C212 6.45761 249 33.9576 251 45.4576C253 56.9576 277 41.9576 292 18.4576C307 -5.04239 332 -5.04238 335 12.4576C338 29.9576 373 45.4576 386 58.4576C399 71.4576 408 40.4576 408 40.4576Z"
                fill="#008080"
              />
            </svg>
            <div className="relative z-10 p-3">
              <p className="text-sm font-normal font-montserrat text-[#333333CC]">
                Total Profit:
              </p>
              <p className="text-lg font-semibold font-montserrat">
                N1.500,000
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <TransactionsTable />
    </main>
  );
};

export default DashboardClient;
