interface FieldWrapperProps {
  fieldId: string;
  label?: string;
  helperText?: string;
  children: React.ReactNode;
}

const FieldWrapper = ({ fieldId, label, helperText, children }: FieldWrapperProps) => {

  return (
    <div>
      <div className="flex gap-2 items-center">
        {label && <label htmlFor={fieldId} className="whitespace-nowrap">{label}</label>}
        <div className="flex gap-2 flex-col items-end">
          {children}
          {helperText && <p>{helperText}</p>}
        </div>
      </div>
    </div>
  );
};

export default FieldWrapper;
