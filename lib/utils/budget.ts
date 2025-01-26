import { Budget } from "@/components/budget/types";
import { Transaction } from "@/components/transactions/types";

export function getBudgetSpendingData(
    budgets: Budget[],
    transactions: Transaction[]
  ) {
    return budgets
      .map((budget) => {
        const totalSpent = transactions
          .filter((tx) => tx.category === budget.category && tx.amount < 0)
          .reduce((acc, tx) => acc - tx.amount, 0);
  
        return {
          ...budget,
          spent: totalSpent,
        };
      })
      .sort((a, b) => b.spent - a.spent);
  }