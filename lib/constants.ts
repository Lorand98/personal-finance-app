import { Enums } from "./supabase/database.types";

export const TRANSACTION_CATEGORIES: Readonly<
  Enums<"transaction_categories">[]
> = [
  "General",
  "Dining Out",
  "Groceries",
  "Entertainment",
  "Transportation",
  "Lifestyle",
  "Personal Care",
  "Education",
  "Bills",
  "Shopping",
];

export const SORTING_OPTIONS = [
  { id: "latest", label: "Latest" },
  { id: "oldest", label: "Oldest" },
  { id: "a_to_z", label: "A to Z" },
  { id: "z_to_a", label: "Z to A" },
  { id: "highest", label: "Highest" },
  { id: "lowest", label: "Lowest" },
] as const;

export const TRANS_CATEGORIES_FILTER = [
  { id: "All Transactions", label: "All Transactions" },
  ...TRANSACTION_CATEGORIES.map((category) => ({
    id: category,
    label: category,
  })),
];

export const THEMES = new Map<string, string>([
  ["#277C78", "Green"],
  ["#F2CDAC", "Yellow"],
  ["#82C9D7", "Cyan"],
  ["#626070", "Navy"],
  ["#C94736", "Red"],
  ["#826CB0", "Purple"],
  ["#597C7C", "Turquoise"],
  ["#93674F", "Brown"],
  ["#934F6F", "Magenta"],
  ["#3F82B2", "Blue"],
  ["#97A0AC", "Grey"],
  ["#7F9161", "Army"],
  ["#CAB361", "Gold"],
  ["#BE6C49", "Orange"],
]);

export const TOAST_MESSAGES = {
  BUDGET_CREATED: {
    title: "Budget added",
    description: "The budget has been created successfully.",
  },
  TRANSACTION_CREATED: {
    title: "Transaction added",
    description: "The transaction has been created successfully.",
  },
} as const;
