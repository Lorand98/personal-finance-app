import { TransactionsTable } from "@/components/transactions/transactions-table";
import { getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Transactions",
};

// Fetch all transactions regardless of URL params
const Transactions = async () => {
  const supabase = await createClient();
  
  
  const transactions = await getTransactions(supabase);

  return (
    <div>
      <div className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl">
        <TransactionsTable transactions={transactions || []} />
      </div>
    </div>
  );
};

export default Transactions;