import { getBudget, getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { getBudgetSpendingData } from "@/lib/utils";
import CommonCard from "../common/common-card";
import ViewAllLink from "../common/view-all-link";
import BudgetSummary from "./budget-summary";

export default async function BudgetOverview() {
  const supabase = await createClient();
  const [
    { data: transactions, error: transactionError },
    { data: budgets, error: budgetError },
  ] = await Promise.all([getTransactions(supabase), getBudget(supabase)]);

  if (transactionError || budgetError) {
    throw new Error("Failed to load budgets overview. Please try again later.");
  }

  const budgetSpendingData = getBudgetSpendingData(
    budgets || [],
    transactions || []
  );
  return (
    <CommonCard>
      <div className="flex items-end justify-between">
        <h2>Budgets</h2>
        <ViewAllLink href="/budget" />
      </div>
      <BudgetSummary budgetSpendingData={budgetSpendingData} compact />
    </CommonCard>
  );
}
