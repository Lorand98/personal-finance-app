import { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "./database.types";

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
  const { data, error } = await supabase.from("transactions").insert(transaction);
  if (error) {
    throw error;
  }
  return data;
}