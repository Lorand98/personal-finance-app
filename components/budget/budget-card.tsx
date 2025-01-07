import { Progress } from "../ui/progress";
import BudgetDetail from "./budget-detail";

interface BudgetCardProps {
  category: string;
  maximum: number;
  theme: string;
  spent: number;
}

export default function BudgetCard({
  category,
  maximum,
  theme,
  spent,
}: BudgetCardProps) {
  const progress = (spent / maximum) * 100;
  const remaining = maximum - spent > 0 ? maximum - spent : 0;

  return (
    <div className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <h2>{category}</h2>
        </div>
        <p className="text-grey-500">Maximum of ${maximum}</p>
        <Progress value={progress} progressBarColor={theme} />
        <div className="flex">
          <BudgetDetail color={theme} label="Spent" value={spent} />
          <BudgetDetail label="Remaining" value={remaining} />
        </div>
      </div>
    </div>
  );
}
