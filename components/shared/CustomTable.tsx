import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomTableProps {
  title?: string;
  headers: string[];
  data?: Record<string, React.ReactNode | string | number | null | undefined>[];
  headerKeyMap: Record<string, string>;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  headers,
  data,
  headerKeyMap,
  onViewAll,
  showViewAll = true,
}) => {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-montserrat">{title}</h3>
          {showViewAll && (
            <button
              onClick={onViewAll}
              className="flex items-center gap-2 text-[#8C8C8C] hover:text-[#333] transition-colors"
            >
              <span className="text-sm font-medium font-montserrat underline">
                View All
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 89 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M83.4709 10.5288C83.5959 10.6538 83.6661 10.8233 83.6661 11.0001C83.6661 11.1769 83.5959 11.3464 83.4709 11.4714L79.6995 15.2428C79.638 15.3064 79.5645 15.3572 79.4831 15.3922C79.4018 15.4271 79.3143 15.4455 79.2258 15.4463C79.1373 15.447 79.0495 15.4302 78.9676 15.3966C78.8856 15.3631 78.8112 15.3136 78.7486 15.251C78.686 15.1884 78.6365 15.114 78.603 15.0321C78.5695 14.9501 78.5526 14.8623 78.5534 14.7738C78.5541 14.6853 78.5725 14.5978 78.6075 14.5165C78.6424 14.4352 78.6932 14.3616 78.7569 14.3001L82.0569 11.0001L78.7569 7.7001C78.6354 7.57436 78.5682 7.40596 78.5698 7.23116C78.5713 7.05637 78.6414 6.88916 78.765 6.76555C78.8886 6.64195 79.0558 6.57183 79.2306 6.57031C79.4054 6.56879 79.5738 6.63599 79.6995 6.75743L83.4709 10.5288Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="rounded-3xl bg-white border-t border-[#F0F0F0] shadow-[5px_5px_20px_0_rgba(10,20,57,0.20)] p-4 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#8C8C8C] hover:bg-transparent">
              {headers.map((header) => (
                <TableHead
                  key={header}
                  className="text-sm font-semibold font-inter text-[#1F1F1F] text-start pb-3 px-3"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow
                key={row.id?.toString() || rowIndex}
                className="border-b border-[#8C8C8C] last:border-b-0 hover:bg-transparent"
              >
                {headers.map((header) => (
                  <TableCell
                    key={`${rowIndex}-${header}`}
                    className="text-sm font-medium font-montserrat text-[#1F1F1F] text-start py-3 px-3 whitespace-nowrap"
                  >
                    {row[headerKeyMap[header]] || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomTable;
