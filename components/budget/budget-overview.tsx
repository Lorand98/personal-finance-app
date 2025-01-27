import { getBudgetSpendingData } from "@/lib/utils";
import CommonCard from "../common/common-card";
import { Transaction } from "../transactions/types";
import BudgetSummary from "./budget-summary";
import { Budget } from "./types";
import ViewAllLink from "../common/view-all-link";

export default function BudgetOverview({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
  const budgetSpendingData = getBudgetSpendingData(budgets, transactions);
  return (
    <CommonCard>
      <div className="flex items-end justify-between">
        <h2>Budgets</h2>
        <ViewAllLink href="/budget" />
      </div>
      <BudgetSummary budgetSpendingData={budgetSpendingData} compact />
    </CommonCard>
  );
}
