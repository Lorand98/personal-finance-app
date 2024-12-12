import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export async function getTransactions(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) {
    throw error;
  }
  return data;
}