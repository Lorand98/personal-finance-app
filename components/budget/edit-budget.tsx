"use client";

import { BaseDialog } from "@/components/base-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import useSWR from "swr";
import BudgetForm, { AvailableOptions } from "./budget-form";
import { Budget } from "./types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditBudget({
  budget,
  onClose,
}: {
  budget: Budget;
  onClose: () => void;
}) {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.BUDGET_UPDATED
  );

  const {
    data: optionsData,
    error: optionsError,
    isLoading: optionsLoading,
  } = useSWR<AvailableOptions>("/api/budgets/available-options", fetcher);

  const onFormSuccess = () => {
    handleSuccess();
    onClose();
  };

  let dialogContent: React.ReactNode = null;

  if (optionsError) {
    dialogContent = (
      <p className="text-red-500">
        Failed to load data. Please try again later.
      </p>
    );
  } else if (optionsLoading) {
    dialogContent = <p>Loading data...</p>;
  } else if (optionsData) {
    const { availableCategories, availableColors } = optionsData;

    const categories = new Set(availableCategories);
    categories.add(budget.category);

    const colors = new Set(availableColors);
    colors.add(budget.theme);

    dialogContent = (
      <BudgetForm
        budget={{ ...budget }}
        availableOptions={{
          availableCategories: Array.from(categories),
          availableColors: Array.from(colors),
        }}
        onSuccess={onFormSuccess}
      />
    );
  }

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="Edit Budget"
      dialogTitle="Edit Budget"
      dialogDescription="Update a previously created budget."
      dialogTriggerButtonProps={{
        variant: "ghost",
        className: "w-full text-left justify-start",
      }}
    >
      {dialogContent}
    </BaseDialog>
  );
}
