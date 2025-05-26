import { getBalance } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import CommonCard from "../common/common-card";

export default async function BalanceOverview() {
  const supabase = await createClient();
  const { data: balance, error } = await getBalance(supabase);
  if (error) {
    throw new Error("Failed to fetch balance data. Please try again later.");
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-evenly  ">
      <CommonCard className="bg-grey-900 text-white">
        <p>Current Balance</p>
        <p className="text-preset-1 font-bold">${balance.current}</p>
      </CommonCard>
      <CommonCard>
        <p>Income</p>
        <p className="text-preset-1 font-bold">${balance.income}</p>
      </CommonCard>
      <CommonCard>
        <p>Expenses</p>
        <p className="text-preset-1 font-bold">${balance.expenses}</p>
      </CommonCard>
    </div>
  );
}
