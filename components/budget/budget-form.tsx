"use client";

import { THEME_CODES, THEMES, TRANSACTION_CATEGORIES } from "@/lib/constants";
import { newBudgetSchema } from "@/lib/validations";
import { createBudgetAction } from "@/app/(dashboard)/budget/actions";
import { useResourceForm } from "@/hooks/use-resource-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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

export type AvailableOptions = {
  availableCategories: Array<(typeof TRANSACTION_CATEGORIES)[number]>;
  availableColors: Array<(typeof THEME_CODES)[number]>;
};

type NewBudgetFormProps = {
  onSuccess: () => void;
  availableOptions: AvailableOptions;
};

export default function NewBudgetForm({
  onSuccess,
  availableOptions: {
    availableCategories: categories,
    availableColors: colors,
  },
}: NewBudgetFormProps) {
  const { form, onSubmit } = useResourceForm({
    schema: newBudgetSchema,
    createAction: createBudgetAction,
    onSuccess,
    defaultValues: {
      category: categories[0] ?? "",
      maximum: 0,
      theme: colors[0] ?? "",
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
                    {colors.map((color) => {
                      const label = THEMES.get(color);
                      return (
                        <SelectItem key={color} value={color}>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            {label ?? color}
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
          text="Add Budget"
          submittingText="Adding..."
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
