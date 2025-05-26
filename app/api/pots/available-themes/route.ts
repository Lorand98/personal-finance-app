import { createClient } from "@/lib/supabase/server";
import { getAvailablePotThemes } from "@/lib/supabase/data-service";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data } = await getAvailablePotThemes(supabase);
    return new Response(
      JSON.stringify({
        availableColors: data,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Log the actual error server-side
    console.error("Error fetching available themes:", error);

    // Return safe generic error message
    return new Response(
      JSON.stringify({
        error: "Failed to fetch available pot themes. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
