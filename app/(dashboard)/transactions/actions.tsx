"use server";

import { Transaction } from "@/components/transactions/types";
import { createTransaction } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTransactionAction(transaction: Transaction) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.log("Authorization error: ", authError);
    throw new Error(
      "Authorization error. Please try again later or log in again."
    );
  }

  if (!user?.id) {
    throw new Error("Invalid token. Please log in again.");
  }

  const transactionCreationError = await createTransaction(supabase, {
    ...transaction,
    user_id: user.id,
  });
  //TODO validate transaction also on the server side

  if (transactionCreationError) {
    throw new Error("Failed to create transaction. Please try again later.");
  }

  revalidatePath("/transactions");
}
