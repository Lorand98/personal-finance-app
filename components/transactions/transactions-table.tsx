"use client";

import { DataTable } from "@/components/ui/table/data-table";
import useUrlParams from "@/hooks/use-url-params";
import useWindowSize from "@/hooks/use-window-size";
import { TRANS_CATEGORIES_FILTER } from "@/lib/constants";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import TransactionFilter from "./transaction-filter";
import TransactionPagination from "./transaction-pagination";
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

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const windowSize = useWindowSize();
  const { updateUrlParams } = useUrlParams();
  const searchParams = useSearchParams();

  const isMobile = windowSize === "xs";

  // Extract current URL params
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";

  // Compute sorting from URL
  const urlSorting = useMemo(() => {
    let sortOption = { id: "date", desc: true };
    switch (sort) {
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
    }
    return [sortOption];
  }, [sort]);

  // Compute filters from URL
  const urlFilters = useMemo(() => {
    const filters = [];
    if (category && category !== "All Transactions") {
      filters.push({ id: "category", value: category });
    }
    if (search) {
      filters.push({ id: "name", value: search });
    }
    return filters;
  }, [category, search]);

  const columnVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    columns.forEach((col) => {
      if ((col.meta as ColumnMeta)?.hideOnMobile) {
        visibility[col.accessorKey as string] = !isMobile;
      }
    });
    return visibility;
  }, [isMobile]);

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: urlSorting,
      columnFilters: urlFilters,
      columnVisibility,
    },
  });

  const handleSort = (item: (typeof SORTING_OPTIONS)[number]) => {
    updateUrlParams("sort", item.id);
  };

  const handleFilter = (item: (typeof TRANS_CATEGORIES_FILTER)[number]) => {
    updateUrlParams("category", item.id === "All Transactions" ? "" : item.id);
  };

  const handleSearch = (term: string) => {
    updateUrlParams("search", term);
  };

  return (
    <div className="flex flex-col gap-6">
      <TransactionFilter
        handleSort={handleSort}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
      />

      <DataTable table={table} />

      <TransactionPagination table={table} isMobile={isMobile} />
    </div>
  );
};