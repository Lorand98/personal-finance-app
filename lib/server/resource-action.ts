import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ResourceActionParams, ServerActionResult } from "./types";

export default async function resourceAction<T extends z.ZodTypeAny>(
  params: ResourceActionParams<T>
): Promise<ServerActionResult<T>> {
  try {
    const supabase = await createClient();
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData?.user?.id) {
      console.error("Auth error:", error);
      return { serverSideError: "Authorization failed. Please log in again." };
    }

    if (params.type === "delete") {
      const operationError = await params.fn(
        supabase,
        params.id,
        userData.user.id
      );

      if (operationError) {
        console.error("DB delete error:", operationError);
        return {
          serverSideError: "Failed to delete entity. Please try again.",
        };
      }

      revalidatePath(params.revalidatePathRoute);
      return { success: true };
    }

    const parsed = params.schema.safeParse(params.data);
    if (!parsed.success) {
      return {
        fieldErrors: parsed.error.flatten().fieldErrors as {
          [K in keyof z.infer<T> | "root"]?: string[];
        },
      };
    }

    const operationError =
      params.type === "create"
        ? await params.fn(supabase, {
            ...parsed.data,
            user_id: userData.user.id,
          })
        : await params.fn(
            supabase,
            {
              ...parsed.data,
              user_id: userData.user.id,
            },
            params.id
          );

    if (operationError) {
      console.error(`DB ${params.type} error:`, operationError);
      return {
        serverSideError: `Failed to ${params.type} entity. Please try again.`,
      };
    }

    revalidatePath(params.revalidatePathRoute);
    return { success: true, data: parsed.data };
  } catch (e: unknown) {
    console.error("Unexpected error:", e);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}
