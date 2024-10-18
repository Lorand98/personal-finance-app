import React from "react";
import SearchBar from "../ui/fields/SearchBar";
import Dropdown from "../ui/fields/Dropdown";

export const TransactionsFilter = () => {
  const transactionSortingOptions = [
    { id: "latest", name: "Latest" },
    { id: "oldest", name: "Oldest" },
    { id: "a_to_z", name: "A to Z" },
    { id: "z_to_a", name: "Z to A" },
    { id: "highest", name: "Highest" },
    { id: "lowest", name: "Lowest" },
  ];

  const transactionCategories = [
    { id: "all", name: "All Transactions" },
    { id: "entertainment", name: "Entertainment" },
    { id: "bills", name: "Bills" },
    { id: "groceries", name: "Groceries" },
    { id: "dining_out", name: "Dining Out" },
    { id: "transportation", name: "Transportation" },
    { id: "personal_care", name: "Personal Care" },
    { id: "education", name: "Education" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "shopping", name: "Shopping" },
    { id: "general", name: "General" },
  ];

  const sortDropdownId = "sort-transactions-dropdown";
  const filterDropdownId = "filter-transactions-dropdown";

  return (
    <div className="flex justify-between gap-4">
      <div className="basis-80 flex-shrink">
        <SearchBar placeholder="Search transaction" />
      </div>

      <div className="flex justify-between gap-6">
        <div>
          <Dropdown
            items={transactionSortingOptions}
            initialSelectedItem={transactionSortingOptions[0]}
            id={sortDropdownId}
            label="Sort by"
            className="w-28"
          />
        </div>
        <div>
          <Dropdown
            items={transactionCategories}
            initialSelectedItem={transactionCategories[0]}
            id={filterDropdownId}
            label="Filter by"
            className="w-44"
          />
        </div>
      </div>
    </div>
  );
};
