import React from 'react'
import FormComponentWrapper from './FormComponentWrapper'

interface BaseInputProps extends Omit<React.ComponentProps<typeof FormComponentWrapper>, 'renderFormComponent'
> {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const BaseInput = ({
    inputProps,
    ...props
}: BaseInputProps) => {
    return (
        <FormComponentWrapper
            {...props}
            renderFormComponent={(className, id) => (
                <input
                    {...inputProps}
                    className={className}
                    id={id}
                />
            )}
        />
    )
}

export default BaseInput;
