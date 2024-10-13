import React, { useId } from 'react';

interface FormComponentWrapperProps {
    renderFormComponent: (className: string, id: string) => React.ReactNode;
    label?: string;
    labelPosition?: 'top' | 'left';
    helperText?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    className?: string;
    id?: string;
}

const FormComponentWrapper = ({ label, labelPosition = 'top', helperText, startAdornment, endAdornment, className, id: paramId, renderFormComponent }
    : FormComponentWrapperProps
) => {
    const generatedId = useId();
    const id = paramId || generatedId;

    return (
        <div className={className}>
            <div className={`flex gap-2 ${labelPosition === 'top' ? 'flex-col' : 'flex-row items-center'}`}>
                {label && <label htmlFor={id}>{label}</label>}
                <div className={`border rounded-lg px-5 py-3 flex items-center gap-4 h-11 relative text-preset-4 border-grey-300 focus-within:outline focus-within:outline-1 focus-within:outline-grey-900
                `}>
                    {startAdornment}
                    {renderFormComponent('border-none focus:outline-none flex-grow', id)}
                    {endAdornment}
                </div>
            </div>
            {helperText && <p>{helperText}</p>}
        </div >
    );
}

export default FormComponentWrapper;