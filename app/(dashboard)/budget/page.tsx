import BudgetCard from "@/components/budget/budget-card";
import BudgetSummary from "@/components/budget/budget-summary";
import { Transaction } from "@/components/transactions/types";
import { getBudget, getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { getBudgetSpendingData } from "@/lib/utils";

export const metadata = {
  title: "Budget",
};

const NoBudgets = () => (
  <div className="py-6 rounded-xl">
    <p className="text-grey-500 text-xl">You have no budgets set up yet.</p>
  </div>
);

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
  const budgets = await getBudget(supabase);
  const transactions = await getTransactions(supabase);

  if (budgets.length === 0) {
    return <NoBudgets />;
  }

  const budgetSpendingData = getBudgetSpendingData(budgets, transactions);

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[5fr_10fr] lg:items-start">
      <BudgetSummary budgetSpendingData={budgetSpendingData} />

      <div className="space-y-6">
        {budgetSpendingData.map((budget) => {
          const latestTransactions = getLatestTransactions(
            transactions,
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
