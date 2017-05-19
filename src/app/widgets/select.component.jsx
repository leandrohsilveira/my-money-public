import React from 'react'

import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'

export default ({input,required,options,label,allowBlank, meta: {touched,error}}) => (
    <Dropdown auto 
                {...input} 
                required={required}
                source={options} 
                label={label} 
                allowBlank={allowBlank}
                error={touched ? error : null} />
)