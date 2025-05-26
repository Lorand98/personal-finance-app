import { getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import TransactionsOverViewTable from "./transactions-overview-table";

export default async function TransactionsOverview() {
  const supabase = await createClient();
  const { data: transactions, error } = await getTransactions(supabase);

  if (error) {
    throw new Error(
      "Failed to load transactions overview. Please try again later."
    );
  }

  return <TransactionsOverViewTable transactions={transactions || []} />;
}
