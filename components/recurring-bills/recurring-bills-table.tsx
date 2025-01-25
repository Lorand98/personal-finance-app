"use client";

import useUrlParams from "@/hooks/use-url-params";
import useWindowSize from "@/hooks/use-window-size";
import { SORTING_OPTIONS } from "@/lib/constants";
import { mapSortingOptionsToTanstack, mobileVisibility } from "@/lib/utils";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Transaction } from "../transactions/types";
import { DataTable } from "../ui/table/data-table";
import RecurringBillsFilter from "./recurring-bills-filter";
import columns from "./recurring-bills-table-columns";

const RecurringBillsTable = ({
  recurringBills,
}: {
  recurringBills: Transaction[];
}) => {
  const windowSize = useWindowSize();
  const { updateUrlParams } = useUrlParams();
  const searchParams = useSearchParams();

  const isMobile = windowSize === "xs";
  const columnVisibility = useMemo(() => {
    return mobileVisibility(columns, isMobile);
  }, [isMobile]);

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "date";

  const urlSearch = useMemo(() => {
    return search ? [{ id: "name", value: search }] : [];
  }, [search]);

  const urlSorting = useMemo(() => mapSortingOptionsToTanstack(sort), [sort]);

  const table = useReactTable({
    data: recurringBills,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters: urlSearch,
      sorting: urlSorting,
    },
  });

  const handleSort = (item: (typeof SORTING_OPTIONS)[number]) => {
    updateUrlParams("sort", item.id);
  };

  const handleSearch = (term: string) => {
    updateUrlParams("search", term);
  };

  return (
    <div className="space-y-6">
      <RecurringBillsFilter
        handleSearch={handleSearch}
        handleSort={handleSort}
        search={search}
        sort={sort}
      />
      <DataTable table={table} />
    </div>
  );
};

export default RecurringBillsTable;
