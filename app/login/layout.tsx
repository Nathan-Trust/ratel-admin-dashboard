import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Admin Panel",
  description: "Login to access the admin panel",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
