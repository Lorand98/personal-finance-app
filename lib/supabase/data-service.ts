import { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "./database.types";

export async function getTransactions(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase
    .from("transactions")
    .select("name, date, amount, category, recurring, avatar");
  if (error) {
    throw error;
  }
  return data;
}

export async function createTransaction(
  supabase: SupabaseClient<Database>,
  transaction: TablesInsert<"transactions">
) {
  const { error } = await supabase.from("transactions").insert(transaction);
  if (error) {
    return error;
  }
}

export async function getBudget(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase
    .from("budgets")
    .select("category, maximum, theme");
  if (error) {
    throw error;
  }
  return data;
}

export async function createBudget(
  supabase: SupabaseClient<Database>,
  budget: TablesInsert<"budgets">
) {
  const { error } = await supabase.from("budgets").insert(budget);
  if (error) {
    return error;
  }
}
