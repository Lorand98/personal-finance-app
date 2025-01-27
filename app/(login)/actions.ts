"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
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
      return { serverSideError: error.message };
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function loginAction(formData: FormData) {
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
    return { serverSideError: error.message };
  }
}
