import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TransactionStatus =
  | "Cancelled"
  | "Pending"
  | "Processing"
  | "Completed";

export const getTransactionStatusColor = (status: TransactionStatus) => {
  const colors = {
    Cancelled: "text-red-failed",
    Pending: "text-orange-pending",
    Processing: "text-blue-500",
    Completed: "text-green-success",
  };
  return colors[status] || "text-[#8C8C8C]";
};

export const getTransactionStatusBadge = (status: TransactionStatus) => {
  const badges = {
    Cancelled: "bg-red-failed/10 text-red-failed",
    Pending: "bg-orange-pending/10 text-orange-pending",
    Processing: "bg-blue-500/10 text-blue-500",
    Completed: "bg-green-success/10 text-green-success",
  };
  return badges[status] || "bg-gray-100 text-gray-600";
};
