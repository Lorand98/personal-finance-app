"use client";

import {
  createBudgetAction,
  editBudgetAction,
} from "@/app/(dashboard)/budget/actions";
import { useResourceForm } from "@/hooks/use-resource-form";
import { THEME_CODES, THEMES, TRANSACTION_CATEGORIES } from "@/lib/constants";
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
                    value={field.value ?? ""}
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
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(THEMES.entries())
                      .sort(([colorA], [colorB]) => {
                        const inColorsA = colors.includes(colorA);
                        const inColorsB = colors.includes(colorB);
                        return inColorsA === inColorsB ? 0 : inColorsA ? -1 : 1;
                      })
                      .map(([color, label]) => {
                        const isDisabled = !colors.includes(color);
                        return (
                          <SelectItem
                            key={color}
                            value={color}
                            disabled={isDisabled}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <span
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              <span className="flex-1">{label ?? color}</span>
                              {isDisabled && (
                                <span className="text-sm text-grey-500">
                                  Already Used
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.root && <p className="text-red-500">{errors.root.message}</p>}

        <SubmitButton
          text={budget ? "Update Budget" : "Add Budget"}
          submittingText={budget ? "Updating Budget" : "Adding Budget"}
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
