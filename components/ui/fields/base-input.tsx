import useFallbackId from "@/hooks/use-fallback-id";
import { cn } from "@/lib/utils";
import FieldWrapper from "./field-wrapper";
import { FieldProps } from "./types";

interface BaseInputProps
  extends React.ComponentPropsWithoutRef<"input">,
    FieldProps {}

const BaseInput = ({
  className,
  label,
  helperText,
  ...props
}: BaseInputProps) => {
  const id = useFallbackId(props.id);

  return (
    <FieldWrapper label={label} helperText={helperText} fieldId={id}>
      <input className={cn("input", className)} {...props} />
    </FieldWrapper>
  );
};

export default BaseInput;
