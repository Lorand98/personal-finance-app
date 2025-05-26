import { formatTransactionDate } from "@/lib/utils";
import UserAvatar from "../common/user-avatar";
import { Transaction } from "../transactions/types";
import Card from "../common/common-card";
import { Progress } from "../ui/progress";
import BudgetDetail from "./budget-detail";
import BudgetOptions from "./budget-options";
import { Budget } from "./types";
import ViewAllLink from "../common/view-all-link";

interface BudgetCardProps {
  budget: Budget;
  spent: number;
  latestTransactions: Transaction[];
}

export default function BudgetCard({
  budget,
  spent,
  latestTransactions,
}: BudgetCardProps) {
  const { category, maximum, theme } = budget;
  const progress = (spent / maximum) * 100;
  const remaining = maximum - spent > 0 ? maximum - spent : 0;

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <h2>{category}</h2>
        </div>
        <BudgetOptions budget={{ ...budget }} />
      </div>
      <p className="text-grey-500">Maximum of ${maximum}</p>
      <Progress
        valuePercent={progress}
        progressBarColor={theme}
        className="h-6"
      />
      <div className="flex">
        <BudgetDetail color={theme} label="Spent" value={spent} />
        <BudgetDetail label="Remaining" value={remaining} />
      </div>
      <div className="w-full bg-beige-100 p-4 rounded-xl">
        <div className="flex justify-between mb-6">
          <h3>Latest Spending</h3>
          <ViewAllLink
            href={`/transactions?category=${category}`}
            text="See All"
          />
        </div>
        {latestTransactions.length === 0 ? (
          <p className="text-grey-500">No available data</p>
        ) : (
          <ul className="divide-y-2 divide-grey-500/[0.15]">
            {latestTransactions.map(({ id, name, amount, avatar, date }) => {
              const currencyAmount = `-$${Math.abs(amount)}`;
              return (
                <li
                  key={id}
                  className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <UserAvatar
                      avatar={avatar}
                      name={name}
                      className="hidden sm:block"
                    />
                    <p className="font-bold">{name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{currencyAmount}</p>
                    <p className="text-grey-500">
                      {formatTransactionDate(date)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
}
