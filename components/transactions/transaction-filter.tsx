import { SORTING_OPTIONS, TRANS_CATEGORIES_FILTER } from "@/lib/constants";
import TableFilter from "../common/table-filter";

type TransactionFilterProps = {
  handleSort: (item: (typeof SORTING_OPTIONS)[number]) => void;
  handleFilter: (item: (typeof TRANS_CATEGORIES_FILTER)[number]) => void;
  handleSearch: (value: string) => void;
  selectedCategory: string;
  selectedSort: string;
  search: string;
};

const TransactionFilter = ({
  handleSort,
  handleFilter,
  handleSearch,
  selectedCategory,
  selectedSort,
  search,
}: TransactionFilterProps) => {
  return (
    <TableFilter
      search={{
        value: search,
        onChange: handleSearch,
        placeholder: "Search transaction",
      }}
      sort={{
        value: selectedSort,
        onChange: handleSort,
        defaultValue: SORTING_OPTIONS[0],
      }}
      categoryFilter={{
        value: selectedCategory,
        onChange: handleFilter,
      }}
    />
  );
};

export default TransactionFilter;
