import { SORTING_OPTIONS, TRANS_CATEGORIES_FILTER } from "@/lib/constants";
import TableDropdown from "../ui/fields/dropdown/table-dropdown";
import SearchBar from "../ui/fields/search-bar";
import MobileFilterIcon from "../ui/icons/mobile-filter-icon";
import MobileSortIcon from "../ui/icons/mobile-sort-icon";

type SortOption = (typeof SORTING_OPTIONS)[number];
type CategoryOption = (typeof TRANS_CATEGORIES_FILTER)[number];

interface SearchConfig {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

interface SortConfig {
  value: string;
  onChange: (item: SortOption) => void;
  defaultValue: SortOption;
}

interface FilterConfig {
  value: string;
  onChange: (item: CategoryOption) => void;
}

interface TableFilterProps {
  search: SearchConfig;
  sort: SortConfig;
  categoryFilter?: FilterConfig;
}

const TableFilter = ({ search, sort, categoryFilter }: TableFilterProps) => {
  const selectedSort =
    SORTING_OPTIONS.find((option) => option.id === sort.value) ??
    sort.defaultValue;
  const selectedCategory =
    categoryFilter &&
    TRANS_CATEGORIES_FILTER.find(
      (option) => option.id === categoryFilter.value
    );

  return (
    <div className="flex justify-between gap-4">
      <div className="basis-80 flex-shrink">
        <SearchBar
          placeholder={search.placeholder}
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
        />
      </div>

      <div className="flex justify-between gap-6">
        <TableDropdown
          items={SORTING_OPTIONS}
          initialSelectedItem={selectedSort}
          id="sort-dropdown"
          label="Sort by"
          onSelect={sort.onChange}
          MobileSvgIcon={MobileSortIcon}
          dropdownLabelClassName="w-14"
        />

        {categoryFilter && (
          <TableDropdown
            items={TRANS_CATEGORIES_FILTER}
            initialSelectedItem={selectedCategory || TRANS_CATEGORIES_FILTER[0]}
            id="filter-dropdown"
            label="Filter by"
            onSelect={categoryFilter.onChange}
            MobileSvgIcon={MobileFilterIcon}
            dropdownLabelClassName="w-28"
          />
        )}
      </div>
    </div>
  );
};

export default TableFilter;
