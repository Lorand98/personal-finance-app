import BudgetCard from "@/components/budget/budget-card";
import BudgetPieChart from "@/components/budget/budget-pie-chart";
import BudgetPieLegendItem from "@/components/budget/budget-pie-legend-item";
import { getBudget, getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Budget",
};

export default async function Budget() {
  const supabase = await createClient();
  const budgets = await getBudget(supabase);
  const transactions = await getTransactions(supabase);

  const budgetSpendingData = budgets
    .map((budget) => {
      const totalSpent = transactions
        .filter((tx) => tx.category === budget.category)
        .reduce((acc, tx) => (tx.amount < 0 ? acc - tx.amount : acc), 0);

      return {
        ...budget,
        spent: totalSpent,
      };
    })
    .sort((a, b) => b.spent - a.spent);

  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-[5fr_10fr] md:items-start ">
      <div className="bg-white py-6 px-3 sm:px-4 md:p-8 rounded-xl flex flex-col sm:flex-row md:flex-col gap-2">
        <BudgetPieChart budgetSpendingData={budgetSpendingData} />
        <div>
          <h2 className="text-lg font-semibold mb-2">Spending Summary</h2>
          <ul className="divide-y">
            {budgetSpendingData.map((budget) => (
              <li key={budget.id}>
                <BudgetPieLegendItem {...budget} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-6">
        {budgetSpendingData.map((budget) => {
          const latestTransactions = transactions
            .filter((tx) => tx.category === budget.category)
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 3);

          return (
            <BudgetCard
              key={budget.id}
              {...budget}
              latestTransactions={latestTransactions}
            />
          );
        })}
      </div>
    </div>
  );
}
