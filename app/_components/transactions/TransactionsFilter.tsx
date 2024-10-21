"use client";

import React from "react";
import SearchBar from "../ui/fields/SearchBar";
import Dropdown from "../ui/fields/Dropdown";
import useUrlParams from "@/app/_hooks/useUrlParams";
import { DropdownItem } from "../ui/fields/Dropdown";
import { transactionCategories, transactionSortingOptions } from "./constants";

export const TransactionsFilter = () => {
  const updateUrlParams = useUrlParams();

  const sortDropdownId = "sort-transactions-dropdown";
  const filterDropdownId = "filter-transactions-dropdown";

  const handleSort = (sort: DropdownItem) => {
    updateUrlParams("sort", sort.id);
  };

  const handleFilter = (category: DropdownItem) => {
    updateUrlParams("category", category.id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrlParams("search", e.target.value);
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="basis-80 flex-shrink">
        <SearchBar placeholder="Search transaction" onChange={handleSearch} />
      </div>

      <div className="flex justify-between gap-6">
        <div>
          <Dropdown
            items={transactionSortingOptions}
            initialSelectedItem={transactionSortingOptions[0]}
            id={sortDropdownId}
            label="Sort by"
            className="w-28"
            onSelect={handleSort}
          />
        </div>
        <div>
          <Dropdown
            items={transactionCategories}
            initialSelectedItem={transactionCategories[0]}
            id={filterDropdownId}
            label="Filter by"
            className="w-44"
            onSelect={handleFilter}
          />
        </div>
      </div>
    </div>
  );
};
