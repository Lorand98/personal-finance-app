"use server";

import { createTransaction } from "@/lib/supabase/data-service";
import { TablesInsert } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

export async function createTransactionAction(
  transaction: TablesInsert<"transactions">
) {
  const supabase = await createClient();

  await createTransaction(supabase, { ...transaction });
}
