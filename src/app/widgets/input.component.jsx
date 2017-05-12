import React from 'react'

import TextField from 'material-ui/TextField'

export default props => {
    console.debug('Input component', props)
    return (
        <TextField className={props.className} floatingLabelText={props.label} {...props.input}></TextField>
    )
}