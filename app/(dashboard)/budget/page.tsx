import { getBudget } from "@/lib/supabase/data-service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Budget",
};

const Budget = async () => {
  const supabase = await createClient();

  const budget = await getBudget(supabase);

  return (
    <div>
      {budget.map((item) => (
        <div key={item.category}>
          <p>{item.category}</p>
          <p>{item.maximum}</p>
          <p>{item.theme}</p>
        </div>
    ))}
    </div>
  );
};

export default Budget;
