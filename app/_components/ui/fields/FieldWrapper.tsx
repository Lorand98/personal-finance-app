interface FieldWrapperProps {
  labelProps?: {
    label: string;
    labelId: string;
  };
  helperText?: string;
  className?: string;
  children?: React.ReactNode;
}

const FieldWrapper = ({
  labelProps,
  helperText,
  className,
  children
}: FieldWrapperProps) => {
  const { label, labelId } = labelProps || {};

  return (
    <div>
      <div
        className="flex gap-2 items-center"
      >
        {label && <label htmlFor={labelId}>{label}</label>}
        <div
          className='border rounded-lg flex items-center h-11 relative text-preset-4 border-grey-300 min-w-28 max-w-80'
        >
            {children}
        </div>
      </div>
      {helperText && <p>{helperText}</p>}
    </div>
  );
};

export default FieldWrapper;
