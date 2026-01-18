"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface GiftCardDetailsProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly card: {
    readonly giftCardName: string;
    readonly country: string;
    readonly noOfPurchases: number;
    readonly dateAdded: string;
    readonly price: string;
    readonly status: number;
    readonly image?: string;
  } | null;
}

const getStatusLabel = (status: number) => {
  const statusMap: Record<number, { label: string; className: string }> = {
    0: {
      label: "Cancelled",
      className: "bg-red/10 text-red",
    },
    1: {
      label: "Pending",
      className: "bg-orange-pending/10 text-orange-pending",
    },
    2: { label: "Processing", className: "bg-blue-500/10 text-blue-500" },
    3: { label: "Completed", className: "bg-teal/10 text-teal" },
  };
  return (
    statusMap[status] || {
      label: "Unknown",
      className: "bg-gray-100 text-gray-600",
    }
  );
};

export function GiftCardDetails({
  isOpen,
  onClose,
  card,
}: GiftCardDetailsProps) {
  if (!card) return null;

  const statusInfo = getStatusLabel(card.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-3xl shadow-2xl w-full max-w-xs p-5 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Gift Card Details</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-xs font-semibold font-montserrat text-[#8C8C8C] uppercase mb-3">
            GIFT CARD
          </h2>

          {/* Card Name */}
          <h3 className="text-xl font-bold font-montserrat text-[#1F1F1F] mb-4">
            {card.giftCardName}
          </h3>
        </div>

        <div className="flex items-center justify-center mb-4">
          {card.image ? (
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={card.image}
                alt={card.giftCardName}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-teal to-teal-light flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">
                {card.giftCardName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="border-b border-[#F0F0F0] pb-2">
            <p className="text-xs font-semibold font-montserrat text-[#1F1F1F]">
              Details
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Name:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {card.giftCardName}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Country:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {card.country}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Quantity:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {card.noOfPurchases}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Status:
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Amount:
              </p>
              <p className="text-sm font-semibold font-montserrat text-[#1F1F1F]">
                {card.price}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm font-medium font-montserrat text-[#8C8C8C]">
                Date:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {card.dateAdded}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-lg bg-teal text-white text-xs font-semibold font-montserrat hover:bg-teal/90 transition-colors"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
