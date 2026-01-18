import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
}

export function StatCard({ title, value, percentage }: StatCardProps) {
  return (
    <div className="w-full h-[120px] p-4 pt-6 rounded-3xl border border-grey-border bg-white">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium font-montserrat text-[#333333CC] leading-tight">
          {title}
        </p>
        <p className="text-xl font-semibold font-montserrat text-black leading-tight mb-1">
          {value}
        </p>
        <div className="flex items-center gap-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 shrink-0"
          >
            <path
              d="M19.5587 10.812L21.6039 17.5808C21.6423 17.7079 21.6286 17.8451 21.5659 17.9621C21.5032 18.0791 21.3965 18.1665 21.2694 18.2049C21.1423 18.2433 21.0052 18.2296 20.8882 18.1669C20.7711 18.1042 20.6838 17.9975 20.6454 17.8704L18.95 12.2568L13.8518 21.7698C13.7891 21.8867 13.6826 21.9739 13.5557 22.0123C13.4287 22.0506 13.2918 22.037 13.1749 21.9743C13.058 21.9117 12.9708 21.8052 12.9324 21.6782C12.8941 21.5513 12.9077 21.4143 12.9704 21.2974L18.0686 11.7845L12.4554 13.4812C12.3283 13.5196 12.1911 13.506 12.0741 13.4432C11.9571 13.3805 11.8698 13.2739 11.8314 13.1468C11.793 13.0197 11.8066 12.8825 11.8693 12.7655C11.9321 12.6485 12.0387 12.5611 12.1658 12.5227L18.9346 10.4776C18.9976 10.4585 19.0637 10.452 19.1291 10.4584C19.1946 10.4649 19.2581 10.4842 19.316 10.5153C19.374 10.5464 19.4253 10.5886 19.4669 10.6395C19.5086 10.6904 19.5397 10.749 19.5587 10.812Z"
              fill="#2E9730"
            />
          </svg>
          <span className="font-montserrat">
            <span className="text-base font-normal text-success">
              {percentage}
            </span>
            <span className="text-xs font-normal text-[#333]">
              {" "}
              vs Last Month
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
