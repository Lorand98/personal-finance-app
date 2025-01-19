import { Budget } from "./types";
import DeleteBudget from "./delete-budget";
import EditBudget from "./edit-budget";
import { OptionsMenu } from "../common/options-menu";

export default function BudgetOptions({ budget }: { budget: Budget }) {
  return (
    <OptionsMenu
      item={budget}
      EditComponent={EditBudget}
      DeleteComponent={DeleteBudget}
    />
  );
}