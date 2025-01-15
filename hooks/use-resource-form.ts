"use client";

import { useForm, Path, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import createResourceAction from "@/lib/server/create-resource-action";

type UseResourceFormProps<T extends z.ZodTypeAny> = {
  schema: T;
  createAction: (data: z.infer<T>) => ReturnType<typeof createResourceAction>;
  onSuccess: () => void;
  defaultValues: DefaultValues<z.infer<T>>;
};
export function useResourceForm<T extends z.ZodTypeAny>({
  schema,
  createAction,
  onSuccess,
  defaultValues,
}: UseResourceFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { setError, reset } = form;

  async function onSubmit(values: z.infer<T>) {
    try {
      const result = await createAction(values);

      if (result.serverSideError) {
        setError("root", { message: result.serverSideError });
      } else if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([key, messages]) => {
          if (!messages?.[0]) return;

          if (key === "root") {
            setError("root", { message: messages[0] });
          } else {
            setError(key as Path<z.infer<T>>, { message: messages[0] });
          }
        });
      } else if (result.success) {
        reset();
        onSuccess();
      }
    } catch (e) {
      setError("root", { message: "Unexpected error occurred" });
    }
  }

  return {
    form,
    onSubmit,
  };
}
