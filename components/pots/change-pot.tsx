"use client";

import { useState } from "react";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import BaseDialog from "../modals/base-dialog";
import { Pot } from "./types";
import { Progress } from "../ui/progress";
import ChangePotForm from "./change-pot-form";
import { cn } from "@/lib/utils";

type ChangePotProps = {
  addition: boolean;
  pot: Pot;
};

//TODO - fetch pot data instead of passing it as a prop so it updates correctly in the UI

export default function ChangePot({ addition, pot }: ChangePotProps) {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.POT_UPDATED
  );
  const { name, target, total } = pot;

  const [amount, setAmount] = useState(0);

  const savingsOfTargetPercent = (total / target) * 100;
  const changeAmount = addition ? amount : -amount;
  const changePercent = (changeAmount / target) * 100;
  const newTotal = total + changeAmount;
  const newTotalPercent = (newTotal / target) * 100;

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel={addition ? "+ Add Money" : "Withdraw"}
      dialogTriggerButtonProps={{
        variant: "secondary",
        size: "lg",
        className: "w-full",
      }}
      dialogTitle={
        addition ? `Add to '${name}'` : `Withdraw from '${name}'`
      }
      dialogDescription={
        addition
          ? "Add money to your pot to keep it separate."
          : "Withdraw from your pot to put money back in your main balance."
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-preset-4 text-grey-500">New Amount</p>
          <p className="text-preset-1 font-bold">${total + changeAmount}</p>
        </div>

        <Progress
          valuePercent={savingsOfTargetPercent}
          changePercent={changePercent}
          variant="secondary"
        />

        <div className="flex justify-between items-center">
          <p
            className={cn(
              {
                "text-green": addition,
                "text-red": !addition,
              },
              "font-bold"
            )}
          >
            {newTotalPercent.toFixed(2)}%
          </p>
          <p className="text-preset-4 text-grey-500">Target of ${target}</p>
        </div>

        <ChangePotForm
          onSuccess={handleSuccess}
          pot={{ ...pot }}
          addition={addition}
          onAmountChange={(val) => setAmount(val)}
        />
      </div>
    </BaseDialog>
  );
}
