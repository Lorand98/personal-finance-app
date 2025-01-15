"use server";

import { createTransaction } from "@/lib/supabase/data-service";
import { newTransactionSchema } from "@/lib/validations";
import createResourceAction from "@/lib/server/create-resource-action";
import { TransactionInsert } from "@/components/transactions/types";

export async function createTransactionAction(transaction: TransactionInsert) {
  return createResourceAction({
    data: transaction,
    schema: newTransactionSchema,
    createFn: createTransaction,
    revalidatePathRoute: "/transactions",
  });
}
