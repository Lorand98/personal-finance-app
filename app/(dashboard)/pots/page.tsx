import NoContent from "@/components/common/no-content";
import PotCard from "@/components/pots/pot-card";
import { getPots } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export default async function Pots() {
  const supabase = await createClient();
  const { data: pots, error } = await getPots(supabase);

  if (error) {
    throw new Error("Failed to fetch pots. Please try again later.");
  }

  return !pots || pots.length === 0 ? (
    <NoContent contentType="pots" />
  ) : (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
      {pots.map((pot) => (
        <PotCard key={pot.id} pot={pot} />
      ))}
    </div>
  );
}
