"use client";

import { createBudgetAction } from "@/app/(dashboard)/budget/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/ui/submit-button";
import { THEMES, TRANSACTION_CATEGORIES } from "@/lib/constants";
import { newBudgetSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof newBudgetSchema>;

export default function NewBudgetForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(newBudgetSchema),
    defaultValues: {
      category: TRANSACTION_CATEGORIES[0],
      maximum: 0,
      theme: "#277C78",
    },
  });

  const {
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    const result = await createBudgetAction({
      category: values.category,
      maximum: values.maximum,
      theme: values.theme,
    });
    if (result.serverSideError) {
      form.setError("root", { message: result.serverSideError });
    } else if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([key, messages]) => {
        if (messages && messages.length > 0) {
          form.setError(key as keyof FormValues, { message: messages[0] });
        }
      });
    } else if (result.success) {
      reset();
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Budget Category */}
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>

                  {/* TODO: show only budgets that do not exist yet (query existing budget categories from DB) */}
                    {TRANSACTION_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Maximum Spend */}
        <FormField
          name="maximum"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Spend</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-grey-500">
                    $
                  </span>
                  <Input
                    type="number"
                    className="pl-8"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value) || 0);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Theme */}
        <FormField
          name="theme"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(THEMES.entries()).map(([color, label]) => (
                      <SelectItem key={label} value={color}>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.root && <p className="text-red">{errors.root.message}</p>}

        <SubmitButton
          text="Add Budget"
          submittingText="Adding..."
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
