"use server";

import { Transaction } from "@/components/transactions/types";
import { createTransaction } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { newTransactionSchema } from "@/lib/validations";

type TransactionResult = {
  success?: boolean;
  fieldErrors?: { [key: string]: string[] };
  serverSideError?: string;
};

export async function createTransactionAction(
  transaction: Transaction
): Promise<TransactionResult> {
  try {
    const parsed = newTransactionSchema.safeParse(transaction);
    if (!parsed.success) {
      return { fieldErrors: parsed.error.flatten().fieldErrors };
    }
    const data = parsed.data;

    const supabase = await createClient();
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData?.user?.id) {
      console.error("Auth error:", error);
      return { serverSideError: "Authorization failed. Please log in again." };
    }

    const transactionError = await createTransaction(supabase, {
      ...data,
      user_id: userData.user.id,
    });
    if (transactionError) {
      console.error("DB creation error:", transactionError);
      return {
        serverSideError: "Failed to create transaction. Please try again.",
      };
    }

    return { success: true };
  } catch (e: unknown) {
    console.error("Unexpected server error:", e);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}
