import { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "./database.types";

//TODO handle error throwing on client side

//TODO let the user insert an acutal balance. Currently an example hardcoded balance is inserted
export async function getBalance(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase.from("balance").select().single();
  if (error) {
    throw error;
  }
  return data;
}

async function updateBalance(
  supabase: SupabaseClient<Database>,
  updates: { current?: number; expenses?: number; income?: number }
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("balance")
    .update(updates)
    .eq("user_id", user.id)
    .single();

  if (error) return error;
}

export async function getTransactions(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase.from("transactions").select();
  if (error) {
    throw error;
  }
  return data;
}

export async function getRecurringBills(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase
    .from("transactions")
    .select()
    .eq("recurring", true)
    .lt("amount", 0);
  if (error) {
    throw error;
  }
  return data;
}

export async function createTransaction(
  supabase: SupabaseClient<Database>,
  transaction: TablesInsert<"transactions">
) {
  const { amount } = transaction;

  // Get current balance
  const balance = await getBalance(supabase);

  // Insert transaction
  const { error: txError } = await supabase
    .from("transactions")
    .insert(transaction);

  if (txError) return txError;

  // Update balance
  const balanceError = await updateBalance(supabase, {
    current: balance.current + amount,
    expenses: amount < 0 ? balance.expenses - amount : balance.expenses,
    income: amount > 0 ? balance.income + amount : balance.income,
  });

  if (balanceError) return balanceError;
}

export async function getBudget(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase.from("budgets").select();
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
    "fn_get_unused_colors",
    {
      table_name: "budgets",
    }
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

export async function updateBudget(
  supabase: SupabaseClient<Database>,
  budget: TablesInsert<"budgets">,
  id: number
) {
  const { error } = await supabase.from("budgets").update(budget).eq("id", id);

  if (error) {
    return error;
  }
}

export async function deleteBudget(
  supabase: SupabaseClient<Database>,
  budgetId: number
) {
  const { error } = await supabase.from("budgets").delete().eq("id", budgetId);
  if (error) {
    return error;
  }
}

export async function getPots(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase.from("pots").select();
  if (error) {
    throw error;
  }
  return data;
}

export async function getAvailablePotThemes(
  supabase: SupabaseClient<Database>
) {
  const { data: unusedColors, error: colorError } = await supabase.rpc(
    "fn_get_unused_colors",
    {
      table_name: "pots",
    }
  );

  if (colorError) {
    throw colorError;
  }

  return { unusedColors };
}

export async function createPot(
  supabase: SupabaseClient<Database>,
  pot: Omit<TablesInsert<"pots">, "total">
) {
  const { error } = await supabase.from("pots").insert({
    ...pot,
    total: 0,
  });
  if (error) {
    return error;
  }
}

export async function updatePot(
  supabase: SupabaseClient<Database>,
  pot: Omit<TablesInsert<"pots">, "total">,
  id: number
) {
  const { error } = await supabase.from("pots").update(pot).eq("id", id);

  if (error) {
    return error;
  }
}

export async function updateTotalPot(
  supabase: SupabaseClient<Database>,
  { amount }: { amount: number },
  id: number
) {
  const balance = await getBalance(supabase);
  const { data: pot, error: selectError } = await supabase
    .from("pots")
    .select("total")
    .eq("id", id)
    .single();

  if (selectError) throw selectError;

  // Update pot total
  const { error: updateError } = await supabase
    .from("pots")
    .update({ total: pot.total + amount })
    .eq("id", id);

  if (updateError) return updateError;

  // Update balance
  const balanceError = await updateBalance(supabase, {
    current: balance.current - amount,
  });

  if (balanceError) return balanceError;
}

export async function deletePot(
  supabase: SupabaseClient<Database>,
  potId: number
) {
  const { data: pot, error: selectError } = await supabase
    .from("pots")
    .select("total")
    .eq("id", potId)
    .single();

  if (selectError) throw selectError;

  const balance = await getBalance(supabase);

  // Delete pot
  const { error: deleteError } = await supabase
    .from("pots")
    .delete()
    .eq("id", potId);

  if (deleteError) return deleteError;

  // Return money to balance
  const balanceError = await updateBalance(supabase, {
    current: balance.current + pot.total,
  });

  if (balanceError) return balanceError;
}
