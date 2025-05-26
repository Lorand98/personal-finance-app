import BudgetCard from "@/components/budget/budget-card";
import BudgetSummary from "@/components/budget/budget-summary";
import NoContent from "@/components/common/no-content";
import { Transaction } from "@/components/transactions/types";
import { getBudget, getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { getBudgetSpendingData } from "@/lib/utils";

export const metadata = {
  title: "Budget",
};

function getLatestTransactions(
  transactions: Transaction[],
  category: string,
  limit = 3
) {
  return transactions
    .filter((tx) => tx.category === category && tx.amount < 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export default async function Budget() {
  const supabase = await createClient();
  const { data: budgets, error: budgetFetchError } = await getBudget(supabase);
  const { data: transactions, error: transactionFetchError } =
    await getTransactions(supabase);

  if (budgetFetchError || transactionFetchError) {
    throw new Error("Failed to load budgets. Please try again later.");
  }

  if (!budgets || budgets.length === 0) {
    return <NoContent contentType="budgets" />;
  }

  const budgetSpendingData = getBudgetSpendingData(budgets, transactions || []);

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[5fr_10fr] lg:items-start">
      <BudgetSummary budgetSpendingData={budgetSpendingData} />

      <div className="space-y-6">
        {budgetSpendingData.map((budget) => {
          const latestTransactions = getLatestTransactions(
            transactions || [],
            budget.category,
            3
          );

          return (
            <BudgetCard
              key={budget.id}
              budget={budget}
              spent={budget.spent}
              latestTransactions={latestTransactions}
            />
          );
        })}
      </div>
    </div>
  );
}
