import data from "@/public/data.json";

import { TransactionsTable } from "@/app/_components/transactions/TransactionsTable";
import withPageHeading from "@/app/_components/layout/withPageHeading";

import { TransactionsFilter } from "@/app/_components/transactions/TransactionsFilter";
import { ServerSideComponentProps } from "@/app/_lib/types";
import {
  TransactionCategories,
  TransactionSortingOptions,
} from "@/app/_components/transactions/types";

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
