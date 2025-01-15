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
  children: React.ReactNode;
}

export function BaseDialog({
  open,
  onOpenChange,
  buttonLabel,
  dialogTitle,
  dialogDescription,
  children,
}: BaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>{buttonLabel}</Button>
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