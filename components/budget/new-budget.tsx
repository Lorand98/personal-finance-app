"use client";

import { BaseDialog } from "@/components/base-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import useSWR, { mutate } from "swr";
import BudgetForm, { AvailableOptions } from "./budget-form";

const fetcher = (url: string): Promise<AvailableOptions> =>
  fetch(url).then((res) => res.json());

export default function NewBudget() {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.BUDGET_CREATED
  );

  const { data, error, isLoading } = useSWR(
    "/api/budgets/available-options",
    fetcher
  );

  const onFormSuccess = () => {
    mutate("/api/budgets/available-options");
    handleSuccess();
  };

  let dialogContent: React.ReactNode = null;

  if (error) {
    dialogContent = (
      <p className="text-red-500">
        Failed to load budget options. Please try again later.
      </p>
    );
  } else if (isLoading) {
    dialogContent = <p>Loading budgets...</p>;
  } else if (data) {
    const { availableCategories, availableColors } = data;

    if (!availableCategories?.length) {
      dialogContent = (
        <p className="p-4 text-sm text-gray-600">
          You have already created budgets for every category. Please remove or
          edit an existing budget to change it.
        </p>
      );
    } else {
      dialogContent = (
        <BudgetForm
          onSuccess={onFormSuccess}
          availableOptions={{ availableCategories, availableColors }}
        />
      );
    }
  }

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="+ Add New Budget"
      dialogTitle="Add New Budget"
      dialogDescription="Choose a category to set a spending budget."
    >
      {dialogContent}
    </BaseDialog>
  );
}
