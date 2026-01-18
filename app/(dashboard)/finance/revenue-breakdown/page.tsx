import { Metadata } from "next";
import React from "react";
import RevenueBreakdownClient from "./client";

export const metadata: Metadata = {
  title: "Revenue Breakdown | Finance | Admin",
  description:
    "Detailed revenue breakdown by gift card type. Analyze purchases and total revenue for each gift card category.",
  keywords: [
    "revenue breakdown",
    "gift card revenue",
    "sales analysis",
    "financial breakdown",
  ],
};

const RevenueBreakdown = () => {
  return <RevenueBreakdownClient />;
};

export default RevenueBreakdown;
