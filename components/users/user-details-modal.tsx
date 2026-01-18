"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    userName: string;
    emailAddress: string;
    noOfPurchases: number;
    dateJoined: string;
    status: "Active" | "Inactive";
  } | null;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  user,
}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-5 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">User Details</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-base font-semibold font-montserrat text-[#1F1F1F] mb-3">
            USER NAME
          </h2>

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal to-teal-light mx-auto mb-2 overflow-hidden flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.userName.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base font-semibold font-montserrat text-[#1F1F1F] mb-1">
            {user.userName}
          </h3>

          {/* Status Badge */}
          <span
            className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium font-montserrat ${
              user.status === "Active"
                ? "bg-green-success/10 text-green-success"
                : "bg-red-failed/10 text-red-failed"
            }`}
          >
            {user.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="border-b border-[#F0F0F0] pb-2">
            <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
              Details
            </p>
          </div>

          <div className="space-y-2.5">
            <div>
              <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
                Name:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {user.userName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
                Email:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {user.emailAddress}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
                Phone Number:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                07xxxxxxxxx
              </p>
            </div>

            <div>
              <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
                Status:
              </p>
              <p
                className={`text-sm font-medium font-montserrat ${
                  user.status === "Active"
                    ? "text-green-success"
                    : "text-red-failed"
                }`}
              >
                {user.status}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
                Purchases:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {user.noOfPurchases}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
                Most Ordered GiftCards:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                Apple, Amazon, Google
              </p>
            </div>

            <div>
              <p className="text-xs font-medium font-montserrat text-[#8C8C8C] mb-1">
                Date Joined:
              </p>
              <p className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                {user.dateJoined}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
