import { cn } from "@/lib/utils";
import { useId } from "react";

interface FieldWrapperProps {
  fieldId: string;
  label?: string;
  helperText?: string;
  children: React.ReactNode;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
}

//TODO deprecate or find alternative solution to fieldwrapper

const FieldWrapper = ({
  fieldId,
  label,
  helperText,
  children,
  labelProps = {},
}: FieldWrapperProps) => {
  const id = useId();
  const { className, ...restProps } = labelProps;

  return (
    <div id={`field-wrapper-${id}`} className="h-full">
      <div className="flex gap-2 items-center h-full">
        {label && (
          <label
            htmlFor={fieldId}
            className={cn("whitespace-nowrap", className)}
            {...restProps}
          >
            {label}
          </label>
        )}
        <div className="flex gap-2 flex-col items-end w-full h-full">
          {children}
          {helperText && <p>{helperText}</p>}
        </div>
      </div>
    </div>
  );
};

export default FieldWrapper;
