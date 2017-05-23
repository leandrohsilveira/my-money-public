import React from 'react'

import FontIcon from 'react-toolbox/lib/font_icon'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardText from 'react-toolbox/lib/card/CardText'

export default props => {

    const defaultStyle = {
        fontSize: 48
    }

    let icon = null
    if(props.icon) {
        icon = (
            <i className={props.icon} style={props.style}></i>
        )
    }

    return (
        <Card style={props.style}>
            <CardTitle avatar={icon} style={props.style} title={props.title} />
            <CardText style={{...defaultStyle, ...props.style}}>
                {props.children}
            </CardText>
        </Card>
    )
}