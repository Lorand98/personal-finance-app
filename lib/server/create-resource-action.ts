import { createClient } from "@/lib/supabase/server";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ServerActionResult<T extends z.ZodTypeAny> = {
  success?: boolean;
  data?: z.infer<T>;
  fieldErrors?: {
    [K in keyof z.infer<T> | "root"]?: string[];
  };
  serverSideError?: string;
};

type CreateEntityFn<T extends z.ZodTypeAny> = (
  supabase: SupabaseClient,
  data: z.infer<T> & { user_id: string }
) => Promise<PostgrestError | undefined>;

export default async function createResourceAction<T extends z.ZodTypeAny>({
  data,
  schema,
  createFn,
  revalidatePathRoute,
}: {
  data: z.input<T>;
  schema: T;
  createFn: CreateEntityFn<T>;
  revalidatePathRoute: string;
}): Promise<ServerActionResult<T>> {
  try {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return {
        fieldErrors: parsed.error.flatten().fieldErrors as {
          [K in keyof z.infer<T> | "root"]?: string[];
        },
      };
    }

    const supabase = await createClient();
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData?.user?.id) {
      console.error("Auth error:", error);
      return { serverSideError: "Authorization failed. Please log in again." };
    }

    const creationError = await createFn(supabase, {
      ...parsed.data,
      user_id: userData.user.id,
    });
    if (creationError) {
      console.error("DB creation error:", creationError);
      return { serverSideError: "Failed to create entity. Please try again." };
    }

    revalidatePath(revalidatePathRoute);
    return { success: true, data: parsed.data };
  } catch (e: unknown) {
    console.error("Unexpected error:", e);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}
