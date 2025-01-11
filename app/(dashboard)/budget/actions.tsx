"use server";

import { createBudget } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { newBudgetSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

type BudgetResult = {
  success?: boolean;
  fieldErrors?: { [key: string]: string[] };
  serverSideError?: string;
};

export async function createBudgetAction(
  budget: Budget
): Promise<BudgetResult> {
  try {
    const parsed = newBudgetSchema.safeParse(budget);
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

    const creationError = await createBudget(supabase, {
      category: data.category,
      maximum: data.maximum,
      theme: data.theme,
      user_id: userData.user.id,
    });
    if (creationError) {
      console.error("DB creation error:", creationError);
      return { serverSideError: "Failed to create budget. Please try again." };
    }

    revalidatePath("/budgets");
    return { success: true };
  } catch (e: unknown) {
    console.error("Unexpected error:", e);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}
