import { SORTING_OPTIONS } from "@/lib/constants";
import TableFilter from "../common/table-filter";

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
  return (
    <TableFilter
      search={{
        value: search,
        onChange: handleSearch,
        placeholder: "Search bills",
      }}
      sort={{
        value: sort,
        onChange: handleSort,
        defaultValue: SORTING_OPTIONS[1],
      }}
    />
  );
};

export default RecurringBillsFilter;
