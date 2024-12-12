import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

//TODO: create a logout inteface 
export async function GET() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }
  redirect("/");
}
