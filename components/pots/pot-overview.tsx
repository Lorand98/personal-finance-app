import { createClient } from "@/lib/supabase/server";
import CommonCard from "../common/common-card";
import FinancialProgressItem from "../common/financial-progress-item";
import ViewAllLink from "../common/view-all-link";
import PotsOverviewIcon from "../ui/icons/pots-overview-icon";
import { getPots } from "@/lib/supabase/data-service";

export default async function PotOverView() {
  const supabase = await createClient();
  const pots = await getPots(supabase);
  const overViewPots = pots.slice(0, 4);
  const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0);



  return (
    <CommonCard>
      <div className="flex justify-between items-end">
        <h2>Pots</h2>
        <ViewAllLink href="/pots" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-evenly lg:flex-col xl:flex-row">
        <div className="flex items-center bg-beige-100 p-4 rounded-2xl gap-4 flex-1">
          <PotsOverviewIcon />
          <div className="flex flex-col">
            <p className="text-grey-500">Total saved</p>
            <p className="text-preset-1 font-bold">${totalSaved}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 flex-1">
          {overViewPots.map(({ id, total, theme, name }) => (
            <FinancialProgressItem
              title={name}
              amount={total}
              theme={theme}
              key={id}
              compact
            />
          ))}
        </div>
      </div>
    </CommonCard>
  );
}
