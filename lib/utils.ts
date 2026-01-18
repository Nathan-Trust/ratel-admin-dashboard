import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TransactionStatus = "Pending" | "Success" | "Failed";

export const getTransactionStatusColor = (status: TransactionStatus) => {
  const colors = {
    Pending: "text-orange-pending",
    Success: "text-green-success",
    Failed: "text-red-failed",
  };
  return colors[status] || "text-[#8C8C8C]";
};

export const getTransactionStatusBadge = (status: TransactionStatus) => {
  const badges = {
    Pending: "bg-orange-pending/10 text-orange-pending",
    Success: "bg-green-success/10 text-green-success",
    Failed: "bg-red-failed/10 text-red-failed",
  };
  return badges[status] || "bg-gray-100 text-gray-600";
};
