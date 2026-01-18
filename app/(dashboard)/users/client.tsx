"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StatCard } from "@/components/dashboard/StatCard";
import CustomTable from "@/components/shared/CustomTable";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import CustomHeader from "@/components/shared/CustomHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/use-users";
import { AdminUser } from "@/models/admin";

interface User {
  id: string;
  userName: string;
  emailAddress: string;
  noOfPurchases: number;
  dateJoined: string;
  status: "Active" | "Inactive";
  actions: React.ReactNode;
}

const getStatusElement = (status: "Active" | "Inactive") => (
  <span
    className={`text-sm font-medium font-montserrat ${
      status === "Active" ? "text-green-success" : "text-red-failed"
    }`}
  >
    {status}
  </span>
);

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

const UserClient = () => {
  const router = useRouter();
  const [page] = useState(1);

  const { data, isLoading } = useUsers({ page });
  const usersData = data?.data?.users || [];
  const pagination = data?.data?.pagination;

  // Calculate stats
  const totalUsers = pagination?.total || 0;
  const activeUsers = usersData.filter((u: AdminUser) => u.status === 1).length;
  const inactiveUsers = usersData.filter(
    (u: AdminUser) => u.status === 0
  ).length;

  const handleViewUser = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  const users: User[] = usersData.map((u: AdminUser) => ({
    id: u.id,
    userName: u.name,
    emailAddress: u.email,
    noOfPurchases: u.noOfPurchases || 0,
    dateJoined: formatDate(u.created_at || new Date().toISOString()),
    status: getStatusElement(u.status === 1 ? "Active" : "Inactive") as any,
    actions: (
      <button
        onClick={() => handleViewUser(u.id)}
        className="px-3 py-1.5 rounded-xl border border-[#8C8C8C] bg-teal text-white text-sm font-semibold font-montserrat hover:bg-teal/90 transition-colors"
      >
        View
      </button>
    ),
  }));

  const headers = [
    "USER NAME",
    "EMAIL ADDRESS",
    "NO. OF PURCHASES",
    "DATE JOINED",
    "STATUS",
    "ACTIONS",
  ];

  const headerKeyMap = {
    "USER NAME": "userName",
    "EMAIL ADDRESS": "emailAddress",
    "NO. OF PURCHASES": "noOfPurchases",
    "DATE JOINED": "dateJoined",
    STATUS: "status",
    ACTIONS: "actions",
  };

  return (
    <main className="w-full max-w-[1100px] pb-6">
      <CustomHeader header="Users" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
          numberOfSkeleton={1}
          contentClassName="block"
          skeleton={
            <>
              <Skeleton className="h-[120px] rounded-3xl" />
              <Skeleton className="h-[120px] rounded-3xl" />
              <Skeleton className="h-[120px] rounded-3xl" />
            </>
          }
          data={usersData.length}
          emptyState={null}
        >
          <>
            <StatCard
              title="Number of Users"
              value={String(totalUsers)}
              percentage="12%"
            />
            <StatCard
              title="Active Users"
              value={String(activeUsers)}
              percentage="12%"
            />
            <StatCard
              title="Inactive Users"
              value={String(inactiveUsers)}
              percentage="12%"
            />
          </>
        </FetchLoadingAndEmptyState>
      </div>

      <FetchLoadingAndEmptyState
        isLoading={isLoading}
        numberOfSkeleton={1}
        skeleton={
          <CustomTableSkeleton headers={headers} rows={8} showViewAll={false} />
        }
        data={users.length}
        emptyState={
          <p className="text-center text-gray-500 py-8">No users found</p>
        }
      >
        <CustomTable
          headers={headers}
          data={users as any}
          headerKeyMap={headerKeyMap}
          showViewAll={false}
        />
      </FetchLoadingAndEmptyState>
    </main>
  );
};

export default UserClient;
