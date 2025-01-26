import LogoutButton from "@/components/auth/logout-button";
import BudgetOverview from "@/components/budget/budget-overview";
import CommonCard from "@/components/common/common-card";
import PotOverView from "@/components/pots/pot-overview";
import RecurringBillsOverview from "@/components/recurring-bills/recurring-bills-overview";
import TransactionsOverView from "@/components/transactions/transactions-overview";
import {
  getBalance,
  getBudget,
  getPots,
  getRecurringBills,
  getTransactions,
} from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const pots = await getPots(supabase);
  const transactions = await getTransactions(supabase);
  const budgets = await getBudget(supabase);
  const recurringBills = await getRecurringBills(supabase);
  const balance = await getBalance(supabase);

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-4 [&>*]:flex-1">
            <PotOverView pots={pots} />
            <TransactionsOverView transactions={transactions} />
          </div>
          <div className=" flex flex-col gap-4 [&>*]:flex-1">
            <BudgetOverview budgets={budgets} transactions={transactions} />
            <RecurringBillsOverview recurringBills={recurringBills} />
          </div>
        </div>
      </div>
    </div>
  );
}
