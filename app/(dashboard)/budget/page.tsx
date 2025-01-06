import BudgetPieChart from "@/components/budget/budget-pie-chart";
import { getBudget, getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Budget",
};

export default async function Budget() {
  const supabase = await createClient();
  const budgets = await getBudget(supabase);
  const transactions = await getTransactions(supabase);

  const budgetSpendingData = budgets.map((budget) => {
    const totalSpent = transactions
      .filter((tx) => tx.category === budget.category)
      .reduce((acc, tx) => (tx.amount < 0 ? acc - tx.amount : acc), 0);

    return {
      ...budget,
      spent: totalSpent,
    };
  });

  return (
    <div className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl flex flex-col sm:flex-row gap-4">
      <BudgetPieChart budgetSpendingData={budgetSpendingData} />
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">Spending Summary</h2>
        <ul className="space-y-2">
          {budgetSpendingData.map(({ category, spent, maximum, theme }) => (
            <li key={category} className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  style={{ backgroundColor: theme }}
                  className="w-1 h-4 rounded-full mr-2"
                />
                <span className="text-preset-4 text-gray-500">{category}</span>
              </div>
              <div>
                <span className="text-preset-3 font-bold mr-1">
                  ${spent.toFixed(2)}
                </span>
                <span className="text-preset-4 text-gray-500">
                  of ${maximum.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
