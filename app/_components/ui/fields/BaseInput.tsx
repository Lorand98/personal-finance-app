import { cn } from "@/app/_lib/utils";
import { FieldProps } from "./types";
import FieldWrapper from "./FieldWrapper";
import useFallbackId from "@/app/_hooks/useFallbackId";

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
