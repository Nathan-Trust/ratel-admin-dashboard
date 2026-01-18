import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomTableEmptyStateProps {
  headers: string[];
  emptyMessage?: string;
}

const CustomTableEmptyState: React.FC<CustomTableEmptyStateProps> = ({
  headers,
  emptyMessage = "No data available.",
}) => {
  const renderTableHeaders = headers.map((header) => (
    <TableHead
      key={header}
      className="text-xs h-8 uppercase py-0 text-lightGray_three bg-[#e9ebed] px-6 dark:bg-[#1f112b]"
    >
      {header}
    </TableHead>
  ));

  return (
    <div className="relative mt-8 lg:mt-2  border border-colorsGrayThree dark:border-[#4C3B5C] rounded-none hide-scroll w-full col-span-3">
      <Table className="hide-scroll">
        <TableHeader className="bg-[#dee1e6] dark:bg-[#291838] h-[40px] border-b border-colorsGrayThree dark:border-[#4C3B5C] text-[#838383] dark:text-[#989898]">
          <TableRow className="border-none text-sm whitespace-nowrap  uppercase bg-[#dee1e6] dark:bg-[#2B1A3A]">
            {renderTableHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#FFFFFF] dark:bg-[#291838] h-[300px] hide-scroll">
          <TableRow className="border-none text-gray-500 bg-transparent hover:bg-transparent">
            <TableCell
              colSpan={headers.length}
              className="text-center py-4 px-6"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTableEmptyState;
