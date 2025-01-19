"use client";

import {
  createBudgetAction,
  editBudgetAction,
} from "@/app/(dashboard)/budget/actions";
import { useResourceForm } from "@/hooks/use-resource-form";
import { THEME_CODES, TRANSACTION_CATEGORIES } from "@/lib/constants";
import { budgetSchema } from "@/lib/validations";

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
import ThemeSelectContent from "../common/theme-select-content";
import { Budget } from "./types";

export type AvailableOptions = {
  availableCategories: Array<(typeof TRANSACTION_CATEGORIES)[number]>;
  availableColors: Array<(typeof THEME_CODES)[number]>;
};

type BudgetFormProps = {
  onSuccess: () => void;
  availableOptions: AvailableOptions;
  budget?: Budget;
};

export default function BudgetForm({
  onSuccess,
  availableOptions: {
    availableCategories: categories,
    availableColors: colors,
  },
  budget,
}: BudgetFormProps) {
  const defaultValues = {
    category: budget?.category ?? categories[0],
    maximum: budget?.maximum ?? undefined,
    theme: budget?.theme ?? colors[0],
  };

  const { form, onSubmit } = useResourceForm({
    schema: budgetSchema,
    action: (data) =>
      budget ? editBudgetAction(data, budget.id) : createBudgetAction(data),
    onSuccess,
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Budget Category */}
        <FormField
          name="category"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
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
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Spend</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    className="pl-8"
                    value={field.value === undefined ? "" : String(field.value)}
                    onChange={(e) => {
                      const raw = e.target.value;
                      field.onChange(raw === "" ? undefined : parseFloat(raw));
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
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <ThemeSelectContent availableColors={colors} />
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.root && <p className="text-red">{errors.root.message}</p>}

        <SubmitButton
          text={budget ? "Save Changes" : "Add Budget"}
          submittingText={budget ? "Saving Changes" : "Adding Budget"}
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
