import { formatTransactionDate } from "@/lib/utils";
import { AvatarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Transaction } from "../transactions/types";
import CaretRightIcon from "../ui/icons/caret-right-icon";
import { Progress } from "../ui/progress";
import BudgetDetail from "./budget-detail";
import BudgetOptions from "./budget-options";
import { Budget } from "./types";

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
    <div className="bg-white w-full p-4 sm:p-6 md:p-8 rounded-xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: theme }}
            />
            <h2>{category}</h2>
          </div>
          <BudgetOptions {...budget} />
        </div>
        <p className="text-grey-500">Maximum of ${maximum}</p>
        <Progress value={progress} progressBarColor={theme} />
        <div className="flex">
          <BudgetDetail color={theme} label="Spent" value={spent} />
          <BudgetDetail label="Remaining" value={remaining} />
        </div>
        <div className="w-full bg-beige-100 p-4 rounded-xl">
          <div className="flex justify-between mb-6">
            <h3>Latest Spending</h3>
            <Link
              href={`/transactions?category=${category}`}
              className="text-grey-500 text-preset-4 flex items-center gap-3"
            >
              See All
              <CaretRightIcon />
            </Link>
          </div>
          {latestTransactions.length === 0 ? (
            <p className="text-grey-500">No available data</p>
          ) : (
            <ul className="divide-y-2 divide-grey-500 divide-opacity-15 ">
              {latestTransactions.map(({ id, name, amount, avatar, date }) => {
                const currencyAmount = `-$${Math.abs(amount)}`;
                return (
                  <li
                    key={id}
                    className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 hidden sm:block">
                        {avatar ? (
                          <Image
                            src={avatar}
                            alt={name}
                            fill
                            className="rounded-full object-cover background-grey-900"
                            placeholder="empty"
                            sizes="40px"
                          />
                        ) : (
                          <AvatarIcon className="w-full h-full" />
                        )}
                      </div>
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
      </div>
    </div>
  );
}
