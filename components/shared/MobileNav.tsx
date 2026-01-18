"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Gift,
  Wallet,
  TrendingUp,
  Settings,
  Menu,
  X,
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

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <>
      <div className="lg:hidden flex items-center justify-between bg-teal-bg rounded-3xl p-4 relative z-50">
        <h1 className="text-xl font-medium font-roboto">LOGO</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-teal-light rounded-lg transition-colors relative z-50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 h-full w-[280px] bg-teal-bg p-6 z-50 shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-medium font-roboto">LOGO</h1>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium font-roboto text-[#333333CC]">
                  MAIN MENU
                </p>
              </div>

              <div className="space-y-2 flex-1">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
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
                    </motion.div>
                  );
                })}
              </div>

              {/* Logout Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                className="mt-auto pt-4 border-t border-teal/20"
              >
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
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
