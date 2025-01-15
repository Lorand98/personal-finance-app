import { Tables, TablesInsert } from "@/lib/supabase/database.types";

// Full transaction type (for display)
export type Transaction = Tables<"transactions">;

// Insert transaction type (for forms)
export type TransactionInsert = Omit<TablesInsert<"transactions">, "user_id">;
