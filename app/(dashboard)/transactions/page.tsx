import { Metadata } from "next";
import React from "react";
import TransactionClient from "./client";

export const metadata: Metadata = {
  title: "Transactions | Admin",
  description:
    "View and manage all gift card transactions. Monitor transaction status (Pending, Success, Failed) and track user purchases in real-time.",
  keywords: [
    "transactions",
    "gift card transactions",
    "payment status",
    "purchase history",
    "transaction management",
  ],
};

const Transactions = () => {
  return <TransactionClient />;
};

export default Transactions;
