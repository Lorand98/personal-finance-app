"use client";

import { DataTable } from "@/components/ui/table/data-table";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CommonCard from "../common/common-card";
import ViewAllLink from "../common/view-all-link";
import { compactColumns } from "./transaction-table-columns";
import { Transaction } from "./types";

const TransactionsOverViewTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const table = useReactTable({
    data: transactions,
    columns: compactColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "date", desc: true }],
      pagination: {
        pageSize: 5,
      },
      columnVisibility: {
        date: false,
      },
    },
  });

  return (
    <CommonCard>
      <div className="flex justify-between items-end">
        <h2>Transactions</h2>
        <ViewAllLink href="/transactions" text="View All" />
      </div>
      <DataTable table={table} />
    </CommonCard>
  );
};

export default TransactionsOverViewTable;
