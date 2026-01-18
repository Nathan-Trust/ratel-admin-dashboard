"use client";

import { MobileNav } from "@/components/shared/MobileNav";
import { Sidebar } from "@/components/shared/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-[#FCFCFD] overflow-hidden flex flex-col">
      <MobileNav />

      <div className="flex-1 p-4 md:p-6 lg:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-hidden">
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 w-full flex-shrink-0 overflow-y-auto overflow-x-hidden no-scrollbar min-w-0 lg:pt-0 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
