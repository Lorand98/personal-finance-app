"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const formSchemas = {
  signup: z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  }),
  login: z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(1, {
      message: "Password is required.",
    }),
  }),
};

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

  const parsed = formSchemas.signup.safeParse(values);

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

  const parsed = formSchemas.login.safeParse(values);

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

  redirect("/dashboard");
}