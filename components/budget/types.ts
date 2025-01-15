import { TablesInsert } from "@/lib/supabase/database.types";

// Full budget type (for display)
export type Budget = TablesInsert<"budgets">;

// Insert budget type (for forms)
export type BudgetInsert = Omit<TablesInsert<"budgets">, "user_id">;
