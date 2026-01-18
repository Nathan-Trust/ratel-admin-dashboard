import { Metadata } from "next";
import GiftCardClient from "./client";

export const metadata: Metadata = {
  title: "Gift Cards | Admin",
  description:
    "Manage your gift card inventory. Add, edit, and view gift cards with pricing and country information. Track purchases and performance.",
  keywords: [
    "gift cards",
    "inventory",
    "gift card management",
    "pricing",
    "Amazon",
    "Apple",
    "Steam",
  ],
};

const GiftCard = () => {
  return <GiftCardClient />;
};

export default GiftCard;
