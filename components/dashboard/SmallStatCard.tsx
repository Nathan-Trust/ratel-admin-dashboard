import { ReactNode } from "react";

interface SmallStatCardProps {
  icon?: ReactNode;
  title: string;
  value: string;
  subtitle: string;
  percentage?: string;
  isPositive?: boolean;
}

export function SmallStatCard({
  icon,
  title,
  value,
  subtitle,
  percentage,
  isPositive = true,
}: SmallStatCardProps) {
  return (
    <div className="w-full sm:w-[195px] h-[150px] rounded-3xl bg-teal-light p-3 flex items-center">
      <div className="flex flex-col gap-1">
        {icon && (
          <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <p className="text-sm font-medium font-montserrat text-[#333333CC] leading-tight">
            {title}
          </p>
          <p className="text-xl font-semibold font-montserrat text-black leading-tight">
            {value}
          </p>
          <div className="flex items-center gap-2">
            {percentage && (
              <span
                className={`text-sm font-medium font-montserrat ${
                  isPositive ? "text-green-success" : "text-red-failed"
                }`}
              >
                {percentage}
              </span>
            )}
            <p className="text-sm font-normal font-montserrat text-[#333]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
