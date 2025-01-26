import PotCard from "@/components/pots/pot-card";
import { getPots } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export default async function Pots() {
  const supabase = await createClient();
  const pots = await getPots(supabase);

  return pots.length === 0 ? (
    <p className="text-grey-500 text-xl">
      No pots available currently. Please add some pots.
    </p>
  ) : (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
      {pots.map((pot) => (
        <PotCard key={pot.id} pot={pot} />
      ))}
    </div>
  );
}
