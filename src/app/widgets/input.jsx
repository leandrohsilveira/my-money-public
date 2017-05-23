import React from 'react'

import Input from 'react-toolbox/lib/input';

export default ({input, className, label, disabled, required, meta: {touched, error}}) => {
    return (
        <Input required={required} className={className} error={touched ? error : null} label={label} disabled={disabled} {...input}></Input>
    )
}