"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type AuthFields = {
  email: string;
  password: string;
  name?: string;
};

type AuthActionState = {
  fieldErrors?: { [K in keyof AuthFields]?: string[] };
  serverSideError?: string;
  success?: boolean;
};

export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const supabase = await createClient();
  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = signupSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    console.error("Sign up error", error);
    if (!error.code) {
      return {
        serverSideError:
          "An unexpected sign-up error occurred. Please try again later.",
      };
    }
    return { serverSideError: error.message };
  }

  revalidatePath("/", "layout");
    redirect("/login?status=verification_sent");
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const supabase = await createClient();
  const values = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    console.error("Sign in error", error);
    if (!error.code) {
      return {
        serverSideError:
          "An unexpected sign-in error occurred. Please try again later.",
      };
    }
    return { serverSideError: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logoutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error", error);
    if (!error.code) {
      return {
        serverSideError:
          "An unexpected sign-out error occurred. Please try again later.",
      };
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}
