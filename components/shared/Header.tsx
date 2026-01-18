import { Bell, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold font-montserrat leading-tight">
          Welcome
          <br />
          Back!
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-2xl border border-[#C2D7FF] bg-[#E6F2EB] flex items-center justify-center relative">
          <Settings className="w-6 h-6 text-[#19887F]" strokeWidth={1.5} />
        </button>
        <button className="w-10 h-10 rounded-2xl border border-[#C2D7FF] bg-[#E6F2EB] flex items-center justify-center relative">
          <Bell className="w-6 h-6 text-[#19887F]" strokeWidth={1.5} />
          <span className="absolute -top-1 right-0.5 w-2 h-2 bg-[#F20303] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
