import React from 'react'

import TextField from 'material-ui/TextField'

export default props => {
    return (
        <TextField className={props.className} floatingLabelText={props.label} disabled={props.disabled} {...props.input}></TextField>
    )
}