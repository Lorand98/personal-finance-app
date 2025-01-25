import RecurringBillsTable from "@/components/recurring-bills/recurring-bills-table";
import { Transaction } from "@/components/transactions/types";
import RecurringBillsIcon from "@/components/ui/icons/recurring-bills-icon";
import { getRecurringBills } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";
import { isRecurringBillPaid } from "@/lib/utils";

const getRecurringTrTypes = (recurringBills: Transaction[]) => {
  const paidBills = recurringBills.filter((bill) =>
    isRecurringBillPaid(bill.date)
  );

  const upcomingBills = recurringBills.filter((bill) => {
    const billDateDay = new Date(bill.date).getDate();
    return billDateDay >= new Date().getDate();
  });

  const dueSoonBills = recurringBills.filter((bill) => {
    const billDateDay = new Date(bill.date).getDate();
    const today = new Date().getDate();
    return billDateDay < today + 5 && billDateDay >= today;
  });

  return { paidBills, upcomingBills, dueSoonBills };
};

const billSum = (bills: Transaction[]) => {
  return Math.abs(
    bills.reduce((acc, bill) => {
      return acc + bill.amount;
    }, 0)
  ).toFixed(2);
};

export default async function RecurringBills() {
  const supabase = await createClient();

  const recurringBills = await getRecurringBills(supabase);

  //for the same vendor and same day number of month, only show one bill
  const uniqueRecurringBills = recurringBills.reduce<Transaction[]>(
    (acc, bill) => {
      const billDate = new Date(bill.date).getDate();
      const billVendor = bill.name;
      const exists = acc.some(
        (item) =>
          new Date(item.date).getDate() === billDate && item.name === billVendor
      );
      if (!exists) {
        acc.push(bill);
      }
      return acc;
    },
    []
  );

  const { paidBills, upcomingBills, dueSoonBills } =
    getRecurringTrTypes(uniqueRecurringBills);

  const paidBillsTotal = billSum(paidBills);
  const upcomingBillsTotal = billSum(upcomingBills);
  const dueSoonBillsTotal = billSum(dueSoonBills);

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_2fr] lg:items-start ">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-stretch sm:gap-6 lg:flex-col">
        <div className="py-6 px-5 flex-1 flex items-center gap-5 sm:gap-10 sm:flex-col sm:items-start sm:justify-center bg-grey-900 text-white rounded-2xl">
          <RecurringBillsIcon />
          <div className="flex flex-col gap-3">
            <p>Total Bills</p>
            <p className="text-preset-1 font-bold">${paidBillsTotal}</p>
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
