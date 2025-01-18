"use client";

import BaseDialog from "@/components/modals/base-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  itemLabel: string;
  description: string;
  triggerButtonProps?: React.ComponentProps<typeof Button>;
  onDelete: () => Promise<{ success: boolean; error?: string }>;
}

export default function DeleteDialog({
  open,
  onOpenChange,
  itemLabel,
  description,
  triggerButtonProps,
  onDelete,
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    const result = await onDelete();
    setLoading(false);

    if (result.success) {
      onOpenChange(false);
    } else if (result.error) {
      setError(result.error);
    }
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      buttonLabel={`Delete ${itemLabel}`}
      dialogTitle={`Delete ${itemLabel}?`}
      dialogDescription={description}
      dialogTriggerButtonProps={triggerButtonProps}
    >
      <Button variant="destructive" onClick={handleDelete} disabled={loading}>
        Yes, Confirm Deletion
        {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
      <Button variant="ghost" onClick={() => onOpenChange(false)}>
        No, Go Back
      </Button>
      {error && <p className="txt-red-500 text-sm">{error}</p>}
    </BaseDialog>
  );
}
