"use client";

import { deleteBudgetAction } from "@/app/(dashboard)/budget/actions";
import { useDialog } from "@/hooks/use-dialog";
import { TOAST_MESSAGES } from "@/lib/constants";
import { useState } from "react";
import { BaseDialog } from "../base-dialog";
import { Button } from "../ui/button";
import { Budget } from "./types";

export default function DeleteBudget({ budget }: { budget: Budget }) {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.BUDGET_DELETED
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    try {
      setLoading(true);
      const result = await deleteBudgetAction(budget.id);
      if (result.success) {
        handleSuccess();
      } else if (result.serverSideError) {
        setError(result.serverSideError);
      }
      setLoading(false);
    } catch (e) {
      setError("Unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="Delete Budget"
      dialogTitle={`Delete '${budget.category}'?`}
      dialogDescription="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
      dialogTriggerButtonProps={{
        variant: "ghost",
        className: "w-full text-left justify-start text-red hover:text-red",
      }}
    >
      <Button
        variant={"destructive"}
        onClick={deleteHandler}
        disabled={loading}
      >
        Yes, Confirm Deletion
        {loading && <span className="ml-2 spinner" />}
      </Button>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        No, Go Back
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </BaseDialog>
  );
}
