import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { Database } from "../supabase/database.types";

export type ServerActionResult<T extends z.ZodTypeAny> = {
  success?: boolean;
  data?: z.infer<T>;
  fieldErrors?: {
    [K in keyof z.infer<T> | "root"]?: string[];
  };
  serverSideError?: string;
};

// Generic DataServiceResult with optional typing
export type DataServiceResult<T = unknown> = {
  data: T;
  error: PostgrestError | Error | null;
};

// Function types with generics
export type CreateEntityFn<T extends z.ZodTypeAny> = (
  supabase: SupabaseClient<Database>,
  data: z.infer<T> & { user_id: string }
) => Promise<DataServiceResult>;

export type UpdateEntityFn<T extends z.ZodTypeAny> = (
  supabase: SupabaseClient<Database>,
  data: z.infer<T> & { user_id: string },
  id: number
) => Promise<DataServiceResult>;

export type DeleteEntityFn = (
  supabase: SupabaseClient<Database>,
  id: number,
  userId: string
) => Promise<DataServiceResult<null>>;

// Operation types
export type BaseOperation = {
  revalidatePathRoute: string;
};

export type CreateOperation<T extends z.ZodTypeAny> = BaseOperation & {
  type: "create";
  fn: CreateEntityFn<T>;
  data: z.input<T>;
  schema: T;
};

export type UpdateOperation<T extends z.ZodTypeAny> = BaseOperation & {
  type: "update";
  fn: UpdateEntityFn<T>;
  id: number;
  data: z.input<T>;
  schema: T;
};

export type DeleteOperation = BaseOperation & {
  type: "delete";
  fn: DeleteEntityFn;
  id: number;
};

export type ResourceActionParams<T extends z.ZodTypeAny> =
  | CreateOperation<T>
  | UpdateOperation<T>
  | DeleteOperation;
