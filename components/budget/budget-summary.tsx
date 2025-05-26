import BudgetPieChart from "./budget-pie-chart";
import FinancialProgressItem from "../common/financial-progress-item";
import { Budget } from "./types";
import { cn } from "@/lib/utils";

interface BudgetSpendingItem extends Budget {
  spent: number;
}

interface BudgetSummaryProps {
  budgetSpendingData: BudgetSpendingItem[];
  compact?: boolean;
}

export default function BudgetSummary({
  budgetSpendingData,
  compact,
}: BudgetSummaryProps) {
  const displayedBudgets = compact
    ? budgetSpendingData.slice(0, 4)
    : budgetSpendingData;
  return (
    <div
      className={cn(
        "bg-white py-6 px-4 sm:px-4 lg:p-8 rounded-xl flex flex-col sm:flex-row sm:items-center  gap-2 lg:items-stretch",
        {
          "lg:flex-col": !compact,
        }
      )}
    >
      <BudgetPieChart
        budgetSpendingData={budgetSpendingData}
        className={cn({
          "flex-1 lg:h-48 xl:h-72": compact,
        })}
      />
      <div
        className={cn({
          "flex-1": !compact,
        })}
      >
        {!compact && (
          <h2 className="text-lg font-semibold mb-2">Spending Summary</h2>
        )}
        <ul
          className={cn({
            "divide-y": !compact,
            "grid grid-cols-2 sm:flex sm:flex-col": compact,
          })}
        >
          {displayedBudgets.map(({ id, category, spent, maximum, theme }) => (
            <li key={id}>
              <FinancialProgressItem
                title={category}
                maximum={compact ? undefined : maximum}
                amount={spent}
                theme={theme}
                className="flex items-center justify-between"
                compact={compact}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
