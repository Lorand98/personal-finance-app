import { SORTING_OPTIONS, TRANS_CATEGORIES_FILTER } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import TableDropdown from "../ui/fields/dropdown/table-dropdown";
import SearchBar from "../ui/fields/search-bar";
import MobileFilterIcon from "../ui/icons/mobile-filter-icon";
import MobileSortIcon from "../ui/icons/mobile-sort-icon";

const TransactionFilter = ({
  handleSort,
  handleFilter,
  handleSearch,
}: {
  handleSort: (item: (typeof SORTING_OPTIONS)[number]) => void;
  handleFilter: (item: (typeof TRANS_CATEGORIES_FILTER)[number]) => void;
  handleSearch: (value: string) => void;
}) => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const selectedSort =
    SORTING_OPTIONS.find((option) => option.id === sort) || SORTING_OPTIONS[0];
  const selectedCategory =
    TRANS_CATEGORIES_FILTER.find((option) => option.id === category) ||
    TRANS_CATEGORIES_FILTER[0];

  const sortDropdownId = "sort-transactions-dropdown";
  const filterDropdownId = "filter-transactions-dropdown";

  return (
    <div className="flex justify-between gap-4">
      <div className="basis-80 flex-shrink">
        <SearchBar
          placeholder="Search transaction"
          value={search || ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex justify-between gap-6">
        <TableDropdown
          items={SORTING_OPTIONS}
          initialSelectedItem={selectedSort}
          id={sortDropdownId}
          label="Sort by"
          onSelect={handleSort}
          MobileSvgIcon={MobileSortIcon}
          dropdownLabelClassName="w-14"
        />
        <TableDropdown
          items={TRANS_CATEGORIES_FILTER}
          initialSelectedItem={selectedCategory}
          id={filterDropdownId}
          label="Filter by"
          onSelect={handleFilter}
          MobileSvgIcon={MobileFilterIcon}
          dropdownLabelClassName="w-28"
        />
      </div>
    </div>
  );
};

export default TransactionFilter;
