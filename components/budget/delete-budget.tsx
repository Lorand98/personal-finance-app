"use client";

import { deleteBudgetAction } from "@/app/(dashboard)/budget/actions";
import DeleteModal from "@/components/modals/delete-modal";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import { Budget } from "./types";

export default function DeleteBudget({ budget }: { budget: Budget }) {
  const { open, setOpen } = useDialog(TOAST_MESSAGES.BUDGET_DELETED);

  const handleDelete = async () => {
    const result = await deleteBudgetAction(budget.id);
    return { success: !!result.success, error: result.serverSideError };
  };

  return (
    <DeleteModal
      open={open}
      onOpenChange={setOpen}
      itemLabel="Budget"
      description="Are you sure you want to delete this budget? This action cannot be reversed."
      onDelete={handleDelete}
      triggerButtonProps={{
        variant: "ghost",
        className: "w-full text-left justify-start text-red hover:text-red",
      }}
    />
  );
}
