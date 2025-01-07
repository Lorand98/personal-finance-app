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
    <div className="space-y-4">
      <div className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl flex flex-col sm:flex-row sm:items-center gap-2">
        <BudgetPieChart budgetSpendingData={budgetSpendingData} />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-2">Spending Summary</h2>
          <ul className="divide-y">
            {budgetSpendingData.map((budget) => (
              <li key={budget.category}>
                <BudgetPieLegendItem {...budget} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {budgetSpendingData.map((budget) => (
        <BudgetCard key={budget.category} {...budget} />
      ))}
    </div>
  );
}
