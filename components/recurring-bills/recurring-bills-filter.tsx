import { SORTING_OPTIONS } from "@/lib/constants";
import TableDropdown from "../ui/fields/dropdown/table-dropdown";
import SearchBar from "../ui/fields/search-bar";
import MobileSortIcon from "../ui/icons/mobile-sort-icon";

type RecurringBillsFilterProps = {
  handleSort: (item: (typeof SORTING_OPTIONS)[number]) => void;
  handleSearch: (value: string) => void;
  search: string;
  sort: string;
};

const RecurringBillsFilter = ({
  handleSort,
  handleSearch,
  search,
  sort,
}: RecurringBillsFilterProps) => {

  const selectedSort =
    SORTING_OPTIONS.find((option) => option.id === sort) || SORTING_OPTIONS[0];

  const sortDropdownId = "sort-recurring-dropdown";

  return (
    <div className="flex justify-between gap-4">
      <SearchBar
        placeholder="Search bills"
        value={search || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="basis-1/2 flex-shrink"
      />
      <TableDropdown
        items={SORTING_OPTIONS}
        initialSelectedItem={selectedSort}
        id={sortDropdownId}
        label="Sort by"
        onSelect={handleSort}
        MobileSvgIcon={MobileSortIcon}
        dropdownLabelClassName="w-14"
      />
    </div>
  );
};

export default RecurringBillsFilter;
