import { supabase } from "./supabase";

export async function getTransactions() {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) {
    throw error;
  }
  return data;
}