import { getRecurringBills } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { getRecurringBillStats } from "@/lib/utils";
import CommonCard from "../common/common-card";
import ViewAllLink from "../common/view-all-link";
import BillSummaryItem from "./bill-summary-item";

export default async function RecurringBillsOverview() {
  const supabase = await createClient();
  const recurringBills = await getRecurringBills(supabase);
  const { paidBillsTotal, upcomingBillsTotal, dueSoonBillsTotal } =
    getRecurringBillStats(recurringBills);
    
  return (
    <CommonCard>
      <div className="flex justify-between items-end">
        <h2>Recurring Bills</h2>
        <ViewAllLink href="/recurring-bills" />
      </div>
      <div className="space-y-3">
        <BillSummaryItem
          label="Paid Bills"
          amount={paidBillsTotal}
          className="border-l-green"
        />
        <BillSummaryItem
          label="Total Upcoming"
          amount={upcomingBillsTotal}
          className="border-l-yellow"
        />
        <BillSummaryItem
          label="Due Soon"
          amount={dueSoonBillsTotal}
          className="border-l-cyan"
        />
      </div>
    </CommonCard>
  );
}
