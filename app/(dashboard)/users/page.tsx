import { Metadata } from "next";
import React from "react";
import UserClient from "./client";

export const metadata: Metadata = {
  title: "Users | Admin",
  description:
    "Manage your user base. View user details, track activity status, monitor purchases, and analyze user engagement with your gift card platform.",
  keywords: [
    "users",
    "user management",
    "customers",
    "user activity",
    "user engagement",
  ],
};

const User = () => {
  return <UserClient />;
};

export default User;
