"use client";

import { deleteBudgetAction } from "@/app/(dashboard)/budget/actions";
import DeleteModal from "@/components/modals/delete-modal";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import { Budget } from "./types";
import { OptionModalCompProps } from "@/lib/types";

export default function DeleteBudget({
  entity: budget,
  onClose,
}: OptionModalCompProps<Budget>) {
  const { open, setOpen, handleSuccess } = useDialog(TOAST_MESSAGES.BUDGET_DELETED);

  const handleDelete = async () => {
    const result = await deleteBudgetAction(budget.id);
    return { success: !!result.success, error: result.serverSideError };
  };

  return (
    <DeleteModal
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
        setOpen(open);
      }}
      itemLabel={`'${budget.category}'`}
      deleteButtonLabel="Delete Budget"
      description="Are you sure you want to delete this budget? This action cannot be reversed."
      onDelete={handleDelete}
      onSuccess={handleSuccess}
      triggerButtonProps={{
        variant: "ghost",
        className: "w-full text-left justify-start text-red hover:text-red",
      }}
    />
  );
}
