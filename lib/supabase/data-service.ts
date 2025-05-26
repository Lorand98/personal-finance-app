import { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "./database.types";

const getUnexpectedOperationError = (operationName: string) =>
  `Failed to ${operationName}. Please try again later.`;

export async function getBalance(supabase: SupabaseClient<Database>) {
  try {
    const { data, error } = await supabase.from("balance").select().single();
    if (error) {
      console.error(error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("fetch balance"));
  }
}

async function updateBalance(
  supabase: SupabaseClient<Database>,
  updates: { current?: number; expenses?: number; income?: number }
) {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error(userError);
      return { data: null, error: userError };
    }

    if (!userData.user) {
      const error = new Error("Not authenticated");
      console.error(error);
      return { data: null, error };
    }

    const { data, error } = await supabase
      .from("balance")
      .update(updates)
      .eq("user_id", userData.user.id)
      .select()
      .single();

    if (error) {
      console.error(error);
    }

    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("update balance"));
  }
}

export async function getTransactions(supabase: SupabaseClient<Database>) {
  try {
    const { data, error } = await supabase.from("transactions").select();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("fetch transactions"));
  }
}

export async function getRecurringBills(supabase: SupabaseClient<Database>) {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select()
      .eq("recurring", true)
      .lt("amount", 0);
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("fetch recurring bills"));
  }
}

export async function createTransaction(
  supabase: SupabaseClient<Database>,
  transaction: TablesInsert<"transactions">
) {
  try {
    const { amount } = transaction;

    // Get current balance
    const { data: balanceData, error: balanceError } = await getBalance(
      supabase
    );
    if (balanceError) {
      console.error(balanceError);
      return { data: null, error: balanceError };
    }

    // Insert transaction
    const { data, error: txError } = await supabase
      .from("transactions")
      .insert(transaction)
      .select();

    console.log(data);

    if (txError) {
      console.error(txError);
      return { data: null, error: txError };
    }

    // Update balance
    const { error: updateError } = await updateBalance(supabase, {
      current: balanceData.current + amount,
      expenses:
        amount < 0 ? balanceData.expenses - amount : balanceData.expenses,
    });

    if (updateError) {
      console.error(updateError);
      return { data: null, error: updateError };
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("create transaction"));
  }
}

export async function getBudget(supabase: SupabaseClient<Database>) {
  try {
    const { data, error } = await supabase.from("budgets").select();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("fetch budget"));
  }
}

export async function getAvailableBudgetOptions(
  supabase: SupabaseClient<Database>
) {
  try {
    const { data: unusedCategories, error: categoryError } = await supabase.rpc(
      "fn_get_unused_categories"
    );

    if (categoryError) {
      console.error(categoryError);
      return { data: null, error: categoryError };
    }

    const { data: unusedColors, error: colorError } = await supabase.rpc(
      "fn_get_unused_colors",
      {
        table_name: "budgets",
      }
    );

    if (colorError) {
      console.error(colorError);
      return { data: null, error: colorError };
    }

    return { data: { unusedCategories, unusedColors }, error: null };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("fetch budget options"));
  }
}

export async function createBudget(
  supabase: SupabaseClient<Database>,
  budget: TablesInsert<"budgets">
) {
  try {
    const { data, error } = await supabase
      .from("budgets")
      .insert(budget)
      .select();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("create budget"));
  }
}

export async function updateBudget(
  supabase: SupabaseClient<Database>,
  budget: TablesInsert<"budgets">,
  id: number
) {
  try {
    const { data, error } = await supabase
      .from("budgets")
      .update(budget)
      .eq("id", id)
      .select();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("update budget"));
  }
}

export async function deleteBudget(
  supabase: SupabaseClient<Database>,
  budgetId: number
) {
  try {
    const { data, error } = await supabase
      .from("budgets")
      .delete()
      .eq("id", budgetId)
      .single();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("delete budget"));
  }
}

export async function getPots(supabase: SupabaseClient<Database>) {
  try {
    const { data, error } = await supabase.from("pots").select();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("fetch pots"));
  }
}

export async function getAvailablePotThemes(
  supabase: SupabaseClient<Database>
) {
  try {
    const { data: unusedColors, error: colorError } = await supabase.rpc(
      "fn_get_unused_colors",
      {
        table_name: "pots",
      }
    );

    if (colorError) {
      console.error(colorError);
      return { data: null, error: colorError };
    }

    return { data:  unusedColors , error: null };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("fetch pot themes"));
  }
}

export async function createPot(
  supabase: SupabaseClient<Database>,
  pot: Omit<TablesInsert<"pots">, "total">
) {
  try {
    const { data, error } = await supabase
      .from("pots")
      .insert({
        ...pot,
        total: 0,
      })
      .select();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("create pot"));
  }
}

export async function updatePot(
  supabase: SupabaseClient<Database>,
  pot: Omit<TablesInsert<"pots">, "total">,
  id: number
) {
  try {
    const { data, error } = await supabase
      .from("pots")
      .update(pot)
      .eq("id", id)
      .select();
    if (error) {
      console.error(error);
    }
    return { data, error };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("update pot"));
  }
}

export async function updateTotalPot(
  supabase: SupabaseClient<Database>,
  { amount }: { amount: number },
  id: number
) {
  try {
    const { data: balanceData, error: balanceError } = await getBalance(
      supabase
    );
    if (balanceError) {
      console.error(balanceError);
      return { data: null, error: balanceError };
    }

    const { data: pot, error: selectError } = await supabase
      .from("pots")
      .select("total")
      .eq("id", id)
      .single();

    if (selectError) {
      console.error(selectError);
      return { data: null, error: selectError };
    }

    // Update pot total
    const { data, error: updateError } = await supabase
      .from("pots")
      .update({ total: pot.total + amount })
      .eq("id", id)
      .select();

    if (updateError) {
      console.error(updateError);
      return { data: null, error: updateError };
    }

    // Update balance
    const { error: balanceUpdateError } = await updateBalance(supabase, {
      current: balanceData.current - amount,
    });

    if (balanceUpdateError) {
      console.error(balanceUpdateError);
      return { data: null, error: balanceUpdateError };
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("update pot total"));
  }
}

export async function deletePot(
  supabase: SupabaseClient<Database>,
  potId: number
) {
  try {
    const { data: pot, error: selectError } = await supabase
      .from("pots")
      .select("total")
      .eq("id", potId)
      .single();

    if (selectError) {
      console.error(selectError);
      return { data: null, error: selectError };
    }

    const { data: balanceData, error: balanceError } = await getBalance(
      supabase
    );
    if (balanceError) {
      console.error(balanceError);
      return { data: null, error: balanceError };
    }

    // Delete pot
    const { data, error: deleteError } = await supabase
      .from("pots")
      .delete()
      .eq("id", potId)

    if (deleteError) {
      console.error(deleteError);
      return { data: null, error: deleteError };
    }

    // Return money to balance
    const { error: balanceUpdateError } = await updateBalance(supabase, {
      current: balanceData.current + pot.total,
    });

    if (balanceUpdateError) {
      console.error(balanceUpdateError);
      return { data: null, error: balanceUpdateError };
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    throw new Error(getUnexpectedOperationError("delete pot"));
  }
}
