import { Pot } from "./types";
import DeletePot from "./delete-pot";
import EditPot from "./edit-pot";
import { OptionsMenu } from "../common/options-menu";

export default function BudgetOptions({ pot }: { pot: Pot }) {
  return (
    <OptionsMenu
      item={pot}
      EditComponent={EditPot}
      DeleteComponent={DeletePot}
    />
  );
}
