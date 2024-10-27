import data from "@/public/data.json";

import withPageHeading from "@/components/layout/with-page-heading";
import { TransactionsFilter } from "@/components/transactions/transactions-filter";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import {
  TransactionCategories,
  TransactionSortingOptions,
} from "@/components/transactions/types";
import { ServerSideComponentProps } from "@/lib/types";

export const metadata = {
  title: "Transactions",
};

const Transactions = ({
  searchParams,
}: ServerSideComponentProps<
  undefined,
  {
    search?: string;
    category?: TransactionCategories;
    sort?: TransactionSortingOptions;
  }
>) => {
  const { transactions } = data;

  const search = searchParams?.search;
  const category = searchParams?.category;
  const sort = searchParams?.sort;

  return (
    <div>
      <div className="bg-white w-full p-8 rounded-xl">
        <TransactionsFilter />
        <TransactionsTable
          transactions={transactions}
          filter={{
            search,
            category,
            sort,
          }}
        />
      </div>
    </div>
  );
};

export default withPageHeading(Transactions, metadata.title);
