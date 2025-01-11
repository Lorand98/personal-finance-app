export const TRANSACTION_CATEGORIES = [
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
] as const;

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
