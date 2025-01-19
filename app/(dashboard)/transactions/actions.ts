"use server";

import { TransactionInsert } from "@/components/transactions/types";
import createResourceAction from "@/lib/server/resource-action";
import { createTransaction } from "@/lib/supabase/data-service";
import { newTransactionSchema } from "@/lib/validations";

export async function createTransactionAction(transaction: TransactionInsert) {
  return createResourceAction({
    data: transaction,
    schema: newTransactionSchema,
    type: "create",
    fn: createTransaction,
    revalidatePathRoute: "/transactions",
  });
}
