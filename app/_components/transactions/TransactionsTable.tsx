"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import moment from "moment";
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
    <table className="min-w-full">
      <thead>
        <tr>
          {tableHeadings.map((heading, index, headingsArr) => (
            <th
              key={heading}
              className={`py-3 ${
                index === headingsArr.length - 1 ? "text-right" : "text-left"
              }`}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map(
          ({ avatar, name, category, date: dateString, amount }) => {
            const date = moment(dateString).format("DD MMM YYYY");
            const isNegative = amount < 0;
            const currencyAmount = `${isNegative ? "-" : "+"}$${Math.abs(
              amount
            )}`;

            return (
              <tr key={`${name}-${date}-${amount}`}>
                <td className="flex items-center gap-4">
                  <div className="relative h-10 w-10">
                    <Image
                      src={`/${avatar}`}
                      alt={name}
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <strong>{name}</strong>
                </td>
                <td className="text-preset-5 text-grey-500">{category}</td>
                <td className="text-preset-5 text-grey-500">{date}</td>
                <td className={`${!isNegative ? "text-green" : ""} text-right`}>
                  <strong>{currencyAmount}</strong>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};
