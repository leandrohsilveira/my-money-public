import React from 'react'

import Input from 'react-toolbox/lib/input';

export default props => {
    return (
        <Input className={props.className} label={props.label} disabled={props.disabled} {...props.input}></Input>
    )
}