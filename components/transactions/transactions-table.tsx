// transactions-table.tsx
"use client";

import { Button } from "@/components/ui/button";
import TableDropdown from "@/components/ui/fields/dropdown/table-dropdown";
import SearchBar from "@/components/ui/fields/search-bar";
import CaretLeftIcon from "@/components/ui/icons/caret-left-icon";
import CaretRightIcon from "@/components/ui/icons/caret-right-icon";
import MobileFilterIcon from "@/components/ui/icons/mobile-filter-icon";
import MobileSortIcon from "@/components/ui/icons/mobile-sort-icon";
import { DataTable } from "@/components/ui/table/data-table";
import useWindowSize from "@/hooks/use-window-size";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import columns, { ColumnMeta } from "./transaction-table-columns";
import { Transaction } from "./types";

const SORTING_OPTIONS = [
  { id: "latest", label: "Latest" },
  { id: "oldest", label: "Oldest" },
  { id: "a_to_z", label: "A to Z" },
  { id: "z_to_a", label: "Z to A" },
  { id: "highest", label: "Highest" },
  { id: "lowest", label: "Lowest" },
] as const;

const sortDropdownId = "sort-transactions-dropdown";
const filterDropdownId = "filter-transactions-dropdown";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);
  const windowSize = useWindowSize();
  const isMobile = windowSize === "xs";

  const columnVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    columns.forEach((column) => {
      if ((column.meta as ColumnMeta)?.hideOnMobile) {
        visibility[column.accessorKey as string] = !isMobile;
      }
    });
    return visibility;
  }, [isMobile]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const transactionCategories = transactions.reduce(
    (acc, transaction) => {
      if (!acc.find((category) => category.id === transaction.category)) {
        acc.push({
          id: transaction.category,
          label: transaction.category,
        });
      }
      return acc;
    },
    [
      {
        id: "All Transactions",
        label: "All Transactions",
      },
    ]
  );

  const handleSort = (item: (typeof SORTING_OPTIONS)[number]) => {
    let sortOption;
    switch (item.id) {
      case "latest":
        sortOption = { id: "date", desc: true };
        break;
      case "oldest":
        sortOption = { id: "date", desc: false };
        break;
      case "a_to_z":
        sortOption = { id: "name", desc: false };
        break;
      case "z_to_a":
        sortOption = { id: "name", desc: true };
        break;
      case "highest":
        sortOption = { id: "amount", desc: true };
        break;
      case "lowest":
        sortOption = { id: "amount", desc: false };
        break;
      default:
        sortOption = { id: "date", desc: true };
    }
    setSorting([sortOption]);
  };

  const handleFilter = (item: (typeof transactionCategories)[number]) => {
    if (item.id === "All Transactions") {
      table.getColumn("category")?.setFilterValue(undefined);
    } else {
      table.getColumn("category")?.setFilterValue(item.id);
    }
  };

  // Helper function to get visible page numbers
  const getVisiblePages = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;
    const pages: (number | "ellipsis")[] = [];

    const maxPageNumbersToShow = isMobile ? 3 : 7;
    const siblingsCount = isMobile ? 1 : 2;

    if (totalPages <= maxPageNumbersToShow) {
      // Show all pages
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingsCount,
        totalPages - 2
      );

      const showLeftEllipsis = leftSiblingIndex > 1;
      const showRightEllipsis = rightSiblingIndex < totalPages - 2;

      // First page
      pages.push(0);

      // Left ellipsis
      if (showLeftEllipsis) {
        pages.push("ellipsis");
      }

      // Left sibling pages
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      // Right ellipsis
      if (showRightEllipsis) {
        pages.push("ellipsis");
      }

      // Last page
      pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <div className="basis-80 flex-shrink">
          <SearchBar
            placeholder="Search transaction"
            value={(table.getColumn("name")?.getFilterValue() as string) || ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="flex justify-between gap-6">
          <TableDropdown
            items={SORTING_OPTIONS}
            initialSelectedItem={SORTING_OPTIONS[0]}
            id={sortDropdownId}
            label="Sort by"
            onSelect={handleSort}
            MobileSvgIcon={MobileSortIcon}
            dropdownLabelClassName="w-14"
          />
          <TableDropdown
            items={transactionCategories}
            initialSelectedItem={transactionCategories[0]}
            id={filterDropdownId}
            label="Filter by"
            onSelect={handleFilter}
            MobileSvgIcon={MobileFilterIcon}
            dropdownLabelClassName="w-28"
          />
        </div>
      </div>

      <DataTable table={table} />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="group p-0 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
              aria-label="Previous Page"
            >
              <CaretLeftIcon className="group-hover:fill-white" />
              <span className="hidden sm:block">Prev</span>
            </Button>
          </PaginationItem>

          <div className="flex gap-2">
            {getVisiblePages().map((page, index) =>
              page === "ellipsis" ? (
                <PaginationEllipsis key={`ellipsis-${index}`} className="w-3" />
              ) : (
                <PaginationItem key={page} className="flex items-center">
                  <Button
                    variant={
                      table.getState().pagination.pageIndex === page
                        ? "default"
                        : "outline"
                    }
                    onClick={() => table.setPageIndex(page)}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    {page + 1}
                  </Button>
                </PaginationItem>
              )
            )}
          </div>

          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="group p-0 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
              aria-label="Next Page"
            >
              <span className="hidden sm:block">Next</span>
              <CaretRightIcon className="group-hover:fill-white" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
