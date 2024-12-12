"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import authSchema from "@/lib/auth/formValidationSchemas";

type AuthError = {
  fieldErrors?: {
    [key: string]: string[];
  };
  serverSideError?: string;
};

export async function signupAction(
  formData: FormData
): Promise<AuthError | null> {
  const supabase = await createClient();

  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = authSchema.signup.safeParse(values);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return { serverSideError: error.message };
  }

  redirect("/login");
}

export async function loginAction(
  formData: FormData
): Promise<AuthError | null> {
  const supabase = await createClient();

  const values = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = authSchema.login.safeParse(values);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { serverSideError: error.message };
  }

  redirect("/");
}
