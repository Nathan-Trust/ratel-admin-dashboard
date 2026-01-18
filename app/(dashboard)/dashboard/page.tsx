import { Metadata } from "next";
import DashboardClient from "./client";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
  description:
    "View your dashboard with key metrics, sales overview, and recent transactions. Monitor your gift card business performance in real-time.",
  keywords: [
    "dashboard",
    "analytics",
    "gift cards",
    "sales",
    "revenue",
    "transactions",
  ],
};

const Dashboard = () => {
  return <DashboardClient />;
};

export default Dashboard;
