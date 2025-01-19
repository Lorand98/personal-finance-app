"use client";

import { createPotAction, editPotAction } from "@/app/(dashboard)/pots/actions";
import { useResourceForm } from "@/hooks/use-resource-form";
import { THEME_CODES } from "@/lib/constants";
import { potSchema } from "@/lib/validations";
import ThemeSelectContent from "../common/theme-select-content";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubmitButton from "@/components/ui/submit-button";
import { Pot } from "./types";

type PotFormProps = {
  onSuccess: () => void;
  availableColors: Array<(typeof THEME_CODES)[number]>;
  pot?: Pot;
};

export default function PotForm({
  onSuccess,
  availableColors: colors,
  pot,
}: PotFormProps) {
  const defaultValues = {
    name: pot?.name ?? "",
    target: pot?.target,
    theme: pot?.theme ?? colors[0],
  };

  const { form, onSubmit } = useResourceForm({
    schema: potSchema,
    action: (data) =>
      pot ? editPotAction(data, pot.id) : createPotAction(data),
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
        {/* Pot Name */}
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pot Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Saving Target  */}
        <FormField
          name="target"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target</FormLabel>
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
                  <ThemeSelectContent availableColors={colors} />
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.root && <p className="text-red-500">{errors.root.message}</p>}

        <SubmitButton
          text={pot ? "Save Changes" : "Add Pot"}
          submittingText={pot ? "Saving Changes" : "Adding Pot"}
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
