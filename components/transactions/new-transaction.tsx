"use client";

import BaseDialog from "@/components/modals/base-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import TransactionForm from "./transaction-form";

export default function NewTransaction() {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.TRANSACTION_CREATED
  );

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="+ Add New Transaction"
      dialogTitle="Add New Transaction"
      dialogDescription="Use this form to record a new transaction."
    >
      <TransactionForm onSuccess={handleSuccess} />
    </BaseDialog>
  );
}
