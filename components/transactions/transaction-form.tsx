"use client";

import { createTransactionAction } from "@/app/(dashboard)/transactions/actions";
import { useResourceForm } from "@/hooks/use-resource-form";
import { TRANSACTION_CATEGORIES } from "@/lib/constants";
import { newTransactionSchema } from "@/lib/validations";
import { Checkbox } from "../ui/checkbox";
import DatePicker from "../ui/date-picker";
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

const TransactionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { form, onSubmit } = useResourceForm({
    schema: newTransactionSchema,
    createAction: createTransactionAction,
    onSuccess,
    defaultValues: {
      name: "",
      category: TRANSACTION_CATEGORIES[0],
      date: new Date().toISOString(),
      recurring: false,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={control}
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
                    <SelectValue placeholder="Select category" />
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
                <FormLabel>Date</FormLabel>
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
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-grey-500">
                    $
                  </span>
                  <Input
                    type="number"
                    className="pl-8"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val ? parseFloat(val) : undefined);
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
        {errors.root && <p className="text-red">{errors.root.message}</p>}
        <SubmitButton
          text="Add Transaction"
          submittingText="Adding Transaction"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
};

export default TransactionForm;
