import { TransactionCategories, TransactionSortingOptions } from "./types";

export const transactionSortingOptions = [
    { id: TransactionSortingOptions.Latest, name: "Latest" },
    { id: TransactionSortingOptions.Oldest, name: "Oldest" },
    { id: TransactionSortingOptions.AToZ, name: "A to Z" },
    { id: TransactionSortingOptions.ZToA, name: "Z to A" },
    { id: TransactionSortingOptions.Highest, name: "Highest" },
    { id: TransactionSortingOptions.Lowest, name: "Lowest" },
];

export const transactionCategories = [
    { id: TransactionCategories.All, name: "All Transactions" },
    { id: TransactionCategories.Entertainment, name: "Entertainment" },
    { id: TransactionCategories.Bills, name: "Bills" },
    { id: TransactionCategories.Groceries, name: "Groceries" },
    { id: TransactionCategories.DiningOut, name: "Dining Out" },
    { id: TransactionCategories.Transportation, name: "Transportation" },
    { id: TransactionCategories.PersonalCare, name: "Personal Care" },
    { id: TransactionCategories.Education, name: "Education" },
    { id: TransactionCategories.Lifestyle, name: "Lifestyle" },
    { id: TransactionCategories.Shopping, name: "Shopping" },
    { id: TransactionCategories.General, name: "General" },
];
