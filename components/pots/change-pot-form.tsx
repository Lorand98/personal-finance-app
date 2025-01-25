"use client";

import { editTotalPotAction } from "@/app/(dashboard)/pots/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { useResourceForm } from "@/hooks/use-resource-form";
import { potChangeAmount } from "@/lib/validations";
import { useEffect } from "react";
import { Pot } from "./types";

type ChangePotFormProps = {
  onSuccess: () => void;
  addition: boolean;
  pot: Pot;
  onAmountChange: (val: number) => void;
};

export default function ChangePotForm({
  onSuccess,
  addition,
  pot,
  onAmountChange,
}: ChangePotFormProps) {
  const maxAmountToChange = addition ? pot.target - pot.total : pot.total;
  const { form, onSubmit } = useResourceForm({
    schema: potChangeAmount(maxAmountToChange),
    action: ({ amount }) =>
      editTotalPotAction(amount, maxAmountToChange, pot.id, addition),
    onSuccess,
    defaultValues: { amount: 0 },
  });

  const {
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  const delta = watch("amount");

  useEffect(() => {
    onAmountChange(delta || 0);
  }, [delta, onAmountChange]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="amount"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {addition ? "Amount to Add" : "Amount to Withdraw"}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    className="pl-8"
                    min={0}
                    max={maxAmountToChange}
                    value={field.value === undefined ? "" : String(field.value)}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        field.onChange(undefined);
                        return;
                      }

                      let numericValue = parseFloat(raw);
                      if (numericValue > maxAmountToChange) {
                        numericValue = maxAmountToChange;
                      }
                      if (numericValue < 0) {
                        numericValue = 0;
                      }

                      if (!isNaN(numericValue)) {
                        field.onChange(numericValue);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!errors.root && <p className="text-red">{errors.root.message}</p>}

        <SubmitButton
          text={addition ? "Confirm Addition" : "Confirm Withdrawal"}
          submittingText="Updating..."
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
