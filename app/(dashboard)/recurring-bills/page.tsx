import RecurringBillsTable from "@/components/recurring-bills/recurring-bills-table";
import RecurringBillsIcon from "@/components/ui/icons/recurring-bills-icon";
import { createClient } from "@/lib/supabase/server";
import { getRecurringBills } from "@/lib/supabase/data-service";
import { getRecurringBillStats } from "@/lib/utils";

export default async function RecurringBills() {
  const supabase = await createClient();
  const { data: recurringBills } = await getRecurringBills(supabase);

  const {
    uniqueRecurringBills,
    paidBills,
    upcomingBills,
    dueSoonBills,
    paidBillsTotal,
    upcomingBillsTotal,
    dueSoonBillsTotal,
    allBillsTotal,
  } = getRecurringBillStats(recurringBills || []);

  if (uniqueRecurringBills.length === 0) {
    return (
      <div className="py-6 rounded-xl">
        <p className="text-grey-500 text-xl">No recurring bills found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_2fr] lg:items-start ">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-stretch sm:gap-6 lg:flex-col">
        <div className="py-6 px-5 flex-1 flex items-center gap-5 sm:gap-10 sm:flex-col sm:items-start sm:justify-center bg-grey-900 text-white rounded-2xl">
          <RecurringBillsIcon />
          <div className="flex flex-col gap-3">
            <p>Total Bills</p>
            <p className="text-preset-1 font-bold">${allBillsTotal}</p>
          </div>
        </div>

        <div className="flex-1 text-preset-5 bg-white p-5 rounded-2xl space-y-5">
          <h2>Summary</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-grey-500">Paid Bills</p>
              <p className="font-bold">
                {paidBills.length} (${paidBillsTotal})
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-grey-500">Total Upcoming</p>
              <p className="font-bold">
                {upcomingBills.length} (${upcomingBillsTotal})
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-red">Due Soon</p>
              <p className="font-bold text-red">
                {dueSoonBills.length} (${dueSoonBillsTotal})
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8  rounded-2xl bg-white">
        <RecurringBillsTable recurringBills={uniqueRecurringBills} />
      </div>
    </div>
  );
}
