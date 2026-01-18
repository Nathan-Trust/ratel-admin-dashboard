import { Metadata } from "next";
import React from "react";
import FinanceClient from "./client";

export const metadata: Metadata = {
  title: "Finance | Admin",
  description:
    "Track your financial performance with detailed revenue and profit analytics. View revenue breakdown by gift card type and monitor monthly trends.",
  keywords: [
    "finance",
    "revenue",
    "profit",
    "analytics",
    "financial reports",
    "gift card revenue",
  ],
};

const Finance = () => {
  return <FinanceClient />;
};

export default Finance;
