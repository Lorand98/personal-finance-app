import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Pot } from "./types";
import Card2 from "../ui/card2";

const PotCard = ({ pot }: { pot: Pot }) => {
  const { name, target, total, theme } = pot;

  const savedPercent = (total / target) * 100;
  return (
    <Card2>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <h2>{name}</h2>
        </div>
        {/* <BudgetOptions {...budget} /> */}
        ...
      </div>
      <div className="flex justify-between items-center">
        <p className="text-grey-500 text-preset-4">Total saved</p>
        <p className="text-preset-1 font-bold">${total}</p>
      </div>
      <Progress
        variant="secondary"
        value={savedPercent}
        progressBarColor={theme}
      />
      <div className="flex justify-between items-center">
        <p className="text-grey-500 text-preset-4 font-bold">
          {savedPercent.toFixed(2)}%
        </p>
        <p className="text-grey-500 text-preset-4">${target}</p>
      </div>
      <div className="flex justify-evenly gap-4">
        <Button variant="secondary" size="lg" className="flex-1">
          +Add Money
        </Button>
        <Button variant="secondary" size="lg" className="flex-1">
          Withdraw
        </Button>
      </div>
    </Card2>
  );
};

export default PotCard;
