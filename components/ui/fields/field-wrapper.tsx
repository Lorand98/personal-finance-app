import { useId } from "react";

interface FieldWrapperProps {
  fieldId: string;
  label?: string;
  helperText?: string;
  children: React.ReactNode;
}

const FieldWrapper = ({
  fieldId,
  label,
  helperText,
  children,
}: FieldWrapperProps) => {
  const id = useId();

  return (
    <div id={`field-wrapper-${id}`}>
      <div className="flex gap-2 items-center">
        {label && (
          <label htmlFor={fieldId} className="whitespace-nowrap">
            {label}
          </label>
        )}
        <div className="flex gap-2 flex-col items-end w-full">
          {children}
          {helperText && <p>{helperText}</p>}
        </div>
      </div>
    </div>
  );
};

export default FieldWrapper;
