import { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "./database.types";

//TODO handle error throwing on client side

export async function getTransactions(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase.from("transactions").select("*");
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
  const { data, error } = await supabase.from("budgets").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function getAvailableBudgetOptions(
  supabase: SupabaseClient<Database>
) {
  const { data: unusedCategories, error: categoryError } = await supabase.rpc(
    "fn_get_unused_categories"
  );

  const { data: unusedColors, error: colorError } = await supabase.rpc(
    "fn_get_unused_colors"
  );

  if (categoryError || colorError) {
    throw categoryError || colorError;
  }

  return { unusedCategories, unusedColors };
}

//TODO check also available budget options (categories and theme colors that are not yet assigned) before insert
export async function createBudget(
  supabase: SupabaseClient<Database>,
  budget: TablesInsert<"budgets">
) {
  const { error } = await supabase.from("budgets").insert(budget);
  if (error) {
    return error;
  }
}
