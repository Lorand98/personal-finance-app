"use server";

import { BudgetInsert } from "@/components/budget/types";
import resourceAction from "@/lib/server/resource-action";
import { createBudget, deleteBudget, updateBudget } from "@/lib/supabase/data-service";
import { budgetSchema } from "@/lib/validations";

export async function createBudgetAction(budget: BudgetInsert) {
  return resourceAction({
    data: budget,
    schema: budgetSchema,
    type: "create",
    fn: createBudget,
    revalidatePathRoute: "/budgets",
  });
}

export async function editBudgetAction(budget: BudgetInsert, id: number) {
  return resourceAction({
    data: budget,
    schema: budgetSchema,
    type: "update",
    fn: updateBudget,
    id,
    revalidatePathRoute: "/budgets",
  });
}

export async function deleteBudgetAction(id: number) {
  return resourceAction({
    type: "delete",
    fn: deleteBudget,
    id,
    revalidatePathRoute: "/budgets",
  });
}
