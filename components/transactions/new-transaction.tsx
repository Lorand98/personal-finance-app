"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TransactionForm from "./transaction-form";

const NewTransaction = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const successHandler = () => {
    toast({
      title: "Transaction added",
      description: "The transaction has been created successfully.",
    });
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Transaction</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-preset-1 font-bold">
            Add New Transaction
          </DialogTitle>
          <DialogDescription>
            Use this form to record a new transaction. Please provide details
            such as the recipient or sender, the amount, the category, and any
            additional notes. This information will help you keep track of your
            personal finances and ensure all transactions are accurately
            documented.
          </DialogDescription>
        </DialogHeader>
        <TransactionForm onSuccess={successHandler} />
      </DialogContent>
    </Dialog>
  );
};

export default NewTransaction;
