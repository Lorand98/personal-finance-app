import BudgetPieChart from "@/components/budget/budget-pie-chart";
import { getBudget } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Budget",
};

const Budget = async () => {
  const supabase = await createClient();
  const budgets = await getBudget(supabase);

  return (
    <div>
      <div className="bg-white w-full py-6 px-3 sm:px-4 md:p-8 rounded-xl">
        <BudgetPieChart budgets={budgets} />
      </div>
    </div>
  );
};

export default Budget;
