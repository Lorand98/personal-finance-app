import { createClient } from "@/lib/supabase/server";
import { getAvailableBudgetOptions } from "@/lib/supabase/data-service";

export async function GET() {
  const supabase = await createClient();

  try {
    const { unusedCategories, unusedColors } = await getAvailableBudgetOptions(
      supabase
    );
    return new Response(
      JSON.stringify({
        availableCategories: unusedCategories,
        availableColors: unusedColors,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Log the actual error server-side
    console.error("Error fetching available options:", error);

    // Return safe generic error message
    return new Response(
      JSON.stringify({
        error: "Failed to fetch available options. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
