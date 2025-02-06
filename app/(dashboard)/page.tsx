import LogoutButton from "@/components/auth/logout-button";
import BalanceOverview from "@/components/balance/balance-overview";
import BudgetOverview from "@/components/budget/budget-overview";
import PotOverView from "@/components/pots/pot-overview";
import RecurringBillsOverview from "@/components/recurring-bills/recurring-bills-overview";
import TransactionsOverView from "@/components/transactions/transaction-overview";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function Home() {
  const susKey = crypto.randomUUID();
  const susKey2 = crypto.randomUUID();
  const susKey3 = crypto.randomUUID();
  const susKey4 = crypto.randomUUID();
  const susKey5 = crypto.randomUUID();
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<Skeleton />} key={susKey}>  
          <BalanceOverview />
        </Suspense>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-4 [&>*]:flex-1">
            <Suspense fallback={<Skeleton />} key={susKey2}>
              <PotOverView />
            </Suspense>
            <Suspense fallback={<Skeleton />} key={susKey3}>
              <TransactionsOverView />
            </Suspense>
          </div>
          <div className=" flex flex-col gap-4 [&>*]:flex-1">
            <Suspense fallback={<Skeleton />} key={susKey4}>
              <BudgetOverview />
            </Suspense>
            <Suspense fallback={<Skeleton />} key={susKey5}>
              <RecurringBillsOverview />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
