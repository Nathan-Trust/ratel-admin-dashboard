import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomTableSkeletonProps {
  title?: string;
  headers: string[];
  rows?: number;
  showViewAll?: boolean;
}

export const CustomTableSkeleton: React.FC<CustomTableSkeletonProps> = ({
  title,
  headers,
  rows = 8,
  showViewAll = true,
}) => {
  const renderSkeletonRows = Array.from({ length: rows }).map((_, rowIndex) => (
    <TableRow
      key={crypto.randomUUID()}
      className="border-b border-[#8C8C8C] last:border-b-0 hover:bg-transparent"
    >
      {headers.map((header) => (
        <TableCell
          key={header}
          className="text-sm font-medium font-montserrat text-[#1F1F1F] text-center py-3 px-3 whitespace-nowrap"
        >
          <Skeleton className="h-4 w-16 mx-auto" />
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-montserrat">{title}</h3>
          {showViewAll && (
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
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
                  className="text-sm font-semibold font-inter text-[#1F1F1F] text-center pb-3 px-3"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{renderSkeletonRows}</TableBody>
        </Table>
      </div>
    </div>
  );
};
