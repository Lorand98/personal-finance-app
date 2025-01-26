import Card from "../common/common-card";
import { Progress } from "../ui/progress";
import ChangePot from "./change-pot";
import PotOptions from "./pot-options";
import { Pot } from "./types";

const PotCard = ({ pot }: { pot: Pot }) => {
  const { name, target, total, theme } = pot;

  const savedPercent = (total / target) * 100;
  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: theme }}
          />
          <h2>{name}</h2>
        </div>
        <PotOptions pot={{ ...pot }} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-grey-500 text-preset-4">Total saved</p>
        <p className="text-preset-1 font-bold">${total}</p>
      </div>
      <Progress
        variant="secondary"
        valuePercent={savedPercent}
        progressBarColor={theme}
      />
      <div className="flex justify-between items-center">
        <p className="text-grey-500 text-preset-4 font-bold">
          {savedPercent.toFixed(2)}%
        </p>
        <p className="text-grey-500 text-preset-4">${target}</p>
      </div>
      <div className="flex justify-evenly gap-4">
        <div className="flex-1">
          <ChangePot addition pot={pot} />
        </div>
        <div className="flex-1">
          <ChangePot addition={false} pot={pot} />
        </div>
      </div>
    </Card>
  );
};

export default PotCard;
