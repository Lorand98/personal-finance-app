import React, { useId } from 'react';

interface FormComponentWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
    renderFormComponent: (className: string, id: string) => React.ReactNode;
    label?: string;
    helperText?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    className?: string;

}

const FormComponentWrapper = ({ label, helperText, startAdornment, endAdornment, className, id: paramId, renderFormComponent }
    : FormComponentWrapperProps
) => {
    const generatedId = useId();
    const id = paramId || generatedId;

    return (
        <div className={className}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className='border border-grey-300 rounded-lg px-5 py-3 flex items-center justify-between h-11'>
                {startAdornment}
                {renderFormComponent('border-none focus:outline-none', id)}
                {endAdornment}
            </div>
            {helperText && <p>{helperText}</p>}
        </div>
    );
}

export default FormComponentWrapper;