"use client";

import { BaseDialog } from "@/components/base-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import NewBudgetForm from "./budget-form";

export default function NewBudget() {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.BUDGET_CREATED
  );

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="+ Add New Budget"
      dialogTitle="Add New Budget"
      dialogDescription="Choose a category to set a spending budget."
    >
      <NewBudgetForm onSuccess={handleSuccess} />
    </BaseDialog>
  );
}
