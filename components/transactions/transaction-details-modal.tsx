"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTransactionStatusBadge, TransactionStatus } from "@/lib/utils";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    userName: string;
    giftCardType: string;
    country: string;
    amount: string;
    status: TransactionStatus;
    dateTime: string;
  } | null;
}

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-5 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold font-montserrat text-[#1F1F1F] mb-2">
            Transaction Details
          </DialogTitle>
        </DialogHeader>

        {/* Status Badge */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-montserrat ${getTransactionStatusBadge(
              transaction.status
            )}`}
          >
            {transaction.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="space-y-2.5">
            <div className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Name:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {transaction.userName}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Email:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {transaction.giftCardType}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Country:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {transaction.country}
              </p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#F0F0F0]">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Amount:
              </p>
              <p className="text-sm font-semibold font-montserrat text-[#1F1F1F]">
                {transaction.amount}
              </p>
            </div>

            <div className="flex justify-between items-center py-2">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Date & Time:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {transaction.dateTime}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-lg border border-[#8C8C8C] text-[#333] text-sm font-semibold font-montserrat hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
