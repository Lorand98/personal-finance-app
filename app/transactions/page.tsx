import data from "@/public/data.json";

import withPageHeading from "@/components/layout/with-page-heading";
import { TransactionsTable } from "@/components/transactions/transactions-table";

export const metadata = {
  title: "Transactions",
};

const Transactions = () => {
  const { transactions } = data;

  return (
    <div>
      <div className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl">
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default withPageHeading(Transactions, metadata.title);
