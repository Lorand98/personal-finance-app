"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import NewBudgetForm from "./budget-form";

export default function NewBudget() {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const successHandler = () => {
    toast({
      title: "Budget added",
      description: "The budget has been created successfully.",
    });
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Budget</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-preset-1 font-bold">
            Add New Budget
          </DialogTitle>
          <DialogDescription>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <NewBudgetForm onSuccess={successHandler} />
      </DialogContent>
    </Dialog>
  );
}
