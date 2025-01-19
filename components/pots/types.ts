import { Tables, TablesInsert } from "@/lib/supabase/database.types";

export type Pot = Tables<"pots">;

export type PotInsert = Omit<TablesInsert<"pots">, "user_id" | "total">;
