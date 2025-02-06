import { getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import TransactionsOverViewTable from "./transactions-overview-table";

export default async function TransactionsOverview() {
  const supabase = await createClient();
  const transactions = await getTransactions(supabase);

  return <TransactionsOverViewTable transactions={transactions} />;
}
