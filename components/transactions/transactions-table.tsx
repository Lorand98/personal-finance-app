"use client";

import { DataTable } from "@/components/ui/table/data-table";
import useUrlParams from "@/hooks/use-url-params";
import useWindowSize from "@/hooks/use-window-size";
import { SORTING_OPTIONS, TRANS_CATEGORIES_FILTER } from "@/lib/constants";
import { mapSortingOptionsToTanstack, mobileVisibility } from "@/lib/utils";
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
import { columns } from "./transaction-table-columns";
import { Transaction } from "./types";

const TransactionsTable = ({ transactions }: {
  transactions: Transaction[];
}) => {
  const windowSize = useWindowSize();
  const { updateUrlParams } = useUrlParams();
  const searchParams = useSearchParams();

  const isMobile = windowSize === "xs";

  // Extract current URL params
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";

  const sorting = useMemo(
    () => mapSortingOptionsToTanstack(sort, [{ id: "date", desc: true }]),
    [sort]
  );

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
    return mobileVisibility(columns, isMobile);
  }, [isMobile]);

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
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
        selectedCategory={category}
        selectedSort={sort}
        search={search}
      />

      <DataTable table={table} />

      <TransactionPagination table={table} isMobile={isMobile} />
    </div>
  );
};

export default TransactionsTable;
