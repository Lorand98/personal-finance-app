import React from 'react'
import FormComponentWrapper from './FormComponentWrapper'

interface BaseSelectProps extends Omit<React.ComponentProps<typeof FormComponentWrapper>, 'renderFormComponent'
> {
    selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>
}

const BaseSelect = ({
    selectProps,
    ...props
}: BaseSelectProps) => {
    return (
        <FormComponentWrapper
            {...props}
            renderFormComponent={(className, id) => (
                <select
                    {...selectProps}
                    className={className}
                    id={id}
                />
            )}
        />
    )
}

export default BaseSelect;
