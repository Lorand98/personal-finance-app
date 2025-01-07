import BudgetPieChart from "@/components/budget/budget-pie-chart";
import { Progress } from "@/components/ui/progress";
import { getBudget, getTransactions } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

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
    <div className="space-y-4">
      <div className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl flex flex-col sm:flex-row items-center gap-2">
        <BudgetPieChart budgetSpendingData={budgetSpendingData} />
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Spending Summary</h2>
          <ul>
            {budgetSpendingData
              .sort((a, b) => b.spent - a.spent)
              .map(({ category, spent, maximum, theme }, index) => (
                <li
                  key={category}
                  className={cn("flex items-center justify-between py-3", {
                    "border-t": index > 0,
                  })}
                >
                  <div className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: theme }}
                      className="w-1 h-5 rounded-full mr-2"
                    />
                    <span className="text-preset-4 text-grey-500">
                      {category}
                    </span>
                  </div>
                  <div>
                    <span className="text-preset-3 font-bold mr-1">
                      ${spent.toFixed(2)}
                    </span>
                    <span className="text-preset-4 text-grey-500">
                      of ${maximum.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {budgetSpendingData.map(({ category, maximum, theme, spent }) => {
        const progress = (spent / maximum) * 100;
        return (
          <div
            key={category}
            className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme }}
              />
              <h2>{category}</h2>
            </div>
            <p className="text-grey-500 my-4">Maximum of ${maximum}</p>
            <Progress
              value={progress}
              progressBarColor={theme}
            />
          </div>
        );
      })}
    </div>
  );
}
