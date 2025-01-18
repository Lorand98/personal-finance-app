"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buttonLabel: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogTriggerButtonProps?: React.ComponentProps<typeof Button>;
  children: React.ReactNode;
}

export default function BaseDialog({
  open,
  onOpenChange,
  buttonLabel,
  dialogTitle,
  dialogDescription,
  dialogTriggerButtonProps,
  children,
}: BaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button {...dialogTriggerButtonProps}>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
