import React from 'react'

import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'

export default props => (
    <Dropdown auto 
                {...props.input} 
                source={props.options} 
                label={props.label} 
                allowBlank={props.allowBlank} />
)