"use server";

import { BudgetInsert } from "@/components/budget/types";
import createResourceAction from "@/lib/server/create-resource-action";
import { createBudget } from "@/lib/supabase/data-service";
import { newBudgetSchema } from "@/lib/validations";

export async function createBudgetAction(budget: BudgetInsert) {
  return createResourceAction({
    data: budget,
    schema: newBudgetSchema,
    createFn: createBudget,
    revalidatePathRoute: "/budgets",
  });
}
