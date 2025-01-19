"use client";

import { deletePotAction } from "@/app/(dashboard)/pots/actions";
import DeleteModal from "@/components/modals/delete-modal";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import { Pot } from "./types";
import { OptionModalCompProps } from "@/lib/types";

export default function DeletePot({
  entity: pot,
  onClose,
}: OptionModalCompProps<Pot>) {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.POT_DELETED
  );

  const handleDelete = async () => {
    const result = await deletePotAction(pot.id);
    return { success: !!result.success, error: result.serverSideError };
  };

  return (
    <DeleteModal
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
        setOpen(open);
      }}
      itemLabel={`'${pot.name}'`}
      deleteButtonLabel="Delete Pot"
      description="Are you sure you want to delete this pot? This action cannot be reversed."
      onDelete={handleDelete}
      onSuccess={handleSuccess}
      triggerButtonProps={{
        variant: "ghost",
        className: "w-full text-left justify-start text-red hover:text-red",
      }}
    />
  );
}
