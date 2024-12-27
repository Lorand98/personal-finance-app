"use client";

import { createTransactionAction } from "@/app/(dashboard)/transactions/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import DatePicker from "../ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SubmitButton from "../ui/submit-button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TRANSACTION_CATEGORIES = [
  "General",
  "Dining Out",
  "Groceries",
  "Entertainment",
  "Transportation",
  "Lifestyle",
  "Personal Care",
  "Education",
  "Bills",
  "Shopping",
] as const;

const NewTransaction = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters"),
    category: z.enum(TRANSACTION_CATEGORIES),
    date: z.string(),
    amount: z.number().refine((val) => val !== 0, {
      message: "Amount must not be 0",
    }),
    recurring: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: TRANSACTION_CATEGORIES[0],
      date: new Date().toISOString(),
      amount: undefined,
      recurring: false,
    },
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (values: FormValues) => {
    try {
      await createTransactionAction(values);
      reset();
      toast({
        title: "Transaction added",
        description: "The transaction has been successfully added.",
      });
      setModalOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Unhandled transaction error:", error.message);
        throw new Error("An unexpected error occurred. Please try again.");
      } else {
        console.error("Unknown transaction error:", error);
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient/Sender Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRANSACTION_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => {
                const selectedDate = field.value
                  ? new Date(field.value)
                  : undefined;

                return (
                  <FormItem>
                    <FormLabel>Transaction Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={selectedDate}
                        onSelect={(date) => {
                          field.onChange(date?.toISOString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        type="number"
                        className="pl-8"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (!value) {
                            field.onChange(undefined);
                            return;
                          }

                          field.onChange(parseFloat(e.target.value));
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="recurring"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 space-y-0">
                  <FormLabel>Recurring</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              text="Add Transaction"
              submittingText="Adding Transaction"
              isSubmitting={isSubmitting}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransaction;
