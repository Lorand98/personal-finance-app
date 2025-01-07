"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validations";

type AuthResult = {
  success?: boolean;
  fieldErrors?: { [key: string]: string[] };
  serverSideError?: string;
};

export async function signupAction(formData: FormData): Promise<AuthResult> {
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
      console.error("Signup error:", error);
      return { serverSideError: "Failed to create account. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected signup error:", error);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}

export async function loginAction(formData: FormData): Promise<AuthResult> {
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
      console.error("Login error:", error);
      return { serverSideError: "Failed to log in. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected login error:", error);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}

export async function logoutAction(): Promise<AuthResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Logout error:", error);
      return { serverSideError: "Logout failed. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected logout error:", error);
    return { serverSideError: "Something went wrong. Please try again." };
  }
}