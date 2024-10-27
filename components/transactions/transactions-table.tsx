"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import { useMemo } from "react";
import {
  Transaction,
  TransactionCategories,
  TransactionSortingOptions,
} from "./types";
import {
  filterTransactions,
  searchTransactionsByName,
  sortTransactions,
} from "./utils";

interface TransactionsTableProps {
  transactions: Transaction[];
  filter: {
    search?: string;
    category?: TransactionCategories;
    sort?: TransactionSortingOptions;
  };
}
export const TransactionsTable = ({
  transactions,
  filter,
}: TransactionsTableProps) => {
  const { search, category, sort } = filter;

  const filteredTransactions = useMemo(() => {
    let updatedTransactions = transactions;

    if (category) {
      updatedTransactions = filterTransactions(updatedTransactions, category);
    }

    if (search) {
      updatedTransactions = searchTransactionsByName(
        updatedTransactions,
        search
      );
    }

    if (sort) {
      updatedTransactions = sortTransactions(updatedTransactions, sort);
    }

    return updatedTransactions;
  }, [transactions, category, search, sort]);

  const tableHeadings = [
    "Recipient / Sender",
    "Category",
    "Transaction Date",
    "Amount",
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeadings.map((heading, index, headingsArr) => (
            <TableHead
              key={heading}
              className={cn("py-3", {
                "text-right": index === headingsArr.length - 1,
              })}
            >
              {heading}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map(
          ({ avatar, name, category, date: dateString, amount }) => {
            const date = moment(dateString).format("DD MMM YYYY");
            const isNegative = amount < 0;
            const currencyAmount = `${isNegative ? "-" : "+"}$${Math.abs(
              amount
            )}`;

            return (
              <TableRow key={`${name}-${date}-${amount}`}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10">
                      <Image
                        src={`/${avatar}`}
                        alt={name}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <strong>{name}</strong>
                  </div>
                </TableCell>
                <TableCell className="text-preset-5 text-grey-500 ">
                  {category}
                </TableCell>
                <TableCell className="text-preset-5 text-grey-500 ">
                  {date}
                </TableCell>
                <TableCell
                  className={cn("text-right", {
                    "text-green": !isNegative,
                  })}
                >
                  <strong>{currencyAmount}</strong>
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};
