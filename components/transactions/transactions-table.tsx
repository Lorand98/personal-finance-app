"use client";

import Dropdown from "@/components/ui/fields/dropdown";
import SearchBar from "@/components/ui/fields/search-bar";
import { DataTable } from "@/components/ui/table/data-table";
import CaretLeftIcon from "@/components/ui/icons/caret-left-icon";
import CaretRightIcon from "@/components/ui/icons/caret-right-icon";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import columns from "./transaction-table-columns";
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
          <div>
            <Dropdown
              items={SORTING_OPTIONS}
              initialSelectedItem={SORTING_OPTIONS[0]}
              id={sortDropdownId}
              label="Sort by"
              className="w-28"
              onSelect={handleSort}
            />
          </div>
          <div>
            <Dropdown
              items={transactionCategories}
              initialSelectedItem={transactionCategories[0]}
              id={filterDropdownId}
              label="Filter by"
              className="w-44"
              onSelect={handleFilter}
            />
          </div>
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
              className="group"
            >
              <CaretLeftIcon className="group-hover:[&_path]:fill-white"/>
              Prev
            </Button>
          </PaginationItem>
          <div className="flex gap-2">
            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <PaginationItem key={index}>
                <Button
                  variant={
                    table.getState().pagination.pageIndex === index
                      ? "default"
                      : "outline"
                  }
                  onClick={() => table.setPageIndex(index)}
                  className="w-10 h-10"
                >
                  {index + 1}
                </Button>
              </PaginationItem>
            ))}
          </div>
          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="group"
            >
              Next
              <CaretRightIcon className="group-hover:[&_path]:fill-white"/>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
