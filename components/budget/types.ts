import {
  Tables,
  TablesInsert,
} from "@/lib/supabase/database.types";

export type Budget = Tables<"budgets">;

export type BudgetInsert = Omit<TablesInsert<"budgets">, "user_id">;
