import { Metadata } from "next";
import React from "react";
import SettingsClient from "./client";

export const metadata: Metadata = {
  title: "Settings | Admin",
  description:
    "Configure your account settings and preferences. Manage your profile, notifications, and platform settings.",
  keywords: [
    "settings",
    "account settings",
    "preferences",
    "configuration",
    "profile",
  ],
};

const Settings = () => {
  return <SettingsClient />;
};

export default Settings;
