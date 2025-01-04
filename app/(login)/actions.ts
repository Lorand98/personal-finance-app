"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validations";
import { redirect } from "next/navigation";

type AuthError = {
  fieldErrors?: { [key: string]: string[] };
  serverSideError?: string;
};

export async function signupAction(
  formData: FormData
): Promise<AuthError | null> {
  try {
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
      console.error(error);
      return { serverSideError: "Failed to create account. Please try again." };
    }
    redirect("/login");
  } catch (error: unknown) {
    console.error(error);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}

export async function loginAction(
  formData: FormData
): Promise<AuthError | null> {
  try {
    const supabase = await createClient();
    const values = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      return { fieldErrors: parsed.error.flatten().fieldErrors };
    }
    const { email, password } = parsed.data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      return { serverSideError: "Failed to log in. Please try again." };
    }
    redirect("/");
  } catch (error: unknown) {
    console.error(error);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}

export async function logoutAction() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      redirect("/error");
    }
    redirect("/login");
  } catch (error: unknown) {
    console.error(error);
    redirect("/error");
  }
}
