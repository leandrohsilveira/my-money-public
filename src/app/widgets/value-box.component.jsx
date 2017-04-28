import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import {Card, CardHeader, CardText} from 'material-ui/Card'

export default props => {

    const defaultStyle = {
        fontSize: 48
    }

    let icon = null
    if(props.icon) {
        icon = (
            <FontIcon className={props.icon} style={props.style}></FontIcon>
        )
    }

    return (
        <Card style={props.style}>
            <CardHeader avatar={icon} titleStyle={props.style} title={props.title}></CardHeader>
            <CardText style={{...defaultStyle, ...props.style}}>
                {props.children}
            </CardText>
        </Card>
    )
}