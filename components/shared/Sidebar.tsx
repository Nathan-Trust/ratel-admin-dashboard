"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Gift,
  Wallet,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";
import { AdminRoutes } from "@/routes";
import { useLogout } from "@/hooks/use-auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: AdminRoutes.DASHBOARD },
  { icon: Users, label: "Users", path: AdminRoutes.USERS },
  { icon: Gift, label: "Gift Cards", path: AdminRoutes.GIFT_CARD },
  { icon: Wallet, label: "Transactions", path: AdminRoutes.TRANSACTIONS },
  { icon: TrendingUp, label: "Finance", path: AdminRoutes.FINANCE },
  { icon: Settings, label: "Settings", path: AdminRoutes.SETTINGS },
];

export function Sidebar() {
  const pathname = usePathname();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-[260px] h-full rounded-3xl bg-teal-bg p-4 flex flex-col overflow-hidden">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-medium font-roboto">LOGO</h1>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <p className="text-base font-medium font-roboto mb-4">MAIN MENU</p>
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md font-montserrat text-base font-medium transition-colors",
                  isActive
                    ? "bg-teal text-white"
                    : "text-[#000107] hover:bg-teal-light"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span className="tracking-[-0.3px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 ">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md font-montserrat text-base font-medium transition-colors w-full",
            "text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          <span className="tracking-[-0.3px]">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </aside>
  );
}
