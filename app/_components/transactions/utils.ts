import { transactionCategories } from "./constants";
import {
  Transaction,
  TransactionSortingOptions,
  TransactionCategories,
} from "./types";

export const filterTransactions = (
  transactions: Transaction[],
  category?: TransactionCategories
): Transaction[] => {
  if (!category || category === TransactionCategories.All) {
    return transactions;
  }
  return transactions.filter(
    (transaction) => transaction.category === transactionCategories.find((c) => c.id === category)?.name
  );
};

export const sortTransactions = (
  transactions: Transaction[],
  sort?: TransactionSortingOptions
): Transaction[] => {
  if (!sort) {
    return transactions;
  }

  const sortedTransactions = [...transactions];

  switch (sort) {
    case TransactionSortingOptions.Latest:
      return sortedTransactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case TransactionSortingOptions.Oldest:
      return sortedTransactions.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case TransactionSortingOptions.AToZ:
      return sortedTransactions.sort((a, b) => a.name.localeCompare(b.name));
    case TransactionSortingOptions.ZToA:
      return sortedTransactions.sort((a, b) => b.name.localeCompare(a.name));
    case TransactionSortingOptions.Highest:
      return sortedTransactions.sort((a, b) => b.amount - a.amount);
    case TransactionSortingOptions.Lowest:
      return sortedTransactions.sort((a, b) => a.amount - b.amount);
    default:
      return transactions;
  }
};

export const searchTransactionsByName = (
  transactions: Transaction[],
  searchedName: string | undefined
) => {
  if (!searchedName) {
    return transactions;
  }

  return transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchedName.toLowerCase())
  );
};
