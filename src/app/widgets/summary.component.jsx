import React from 'react'

import {white, red700, lightGreen700, blueGrey700} from 'material-ui/styles/colors'

import ValueBox from './value-box.component'

export default props => {
    
    const creditsStyle = {backgroundColor: lightGreen700, color: white}
    const debtsStyle = {backgroundColor: red700, color: white}
    const summaryStyle = {backgroundColor: blueGrey700, color: white}
    const currency = props.currency || 'R$'
    const credits = props.credits || 0
    const debts = props.debts || 0
    const summary = credits - debts

    return (
        <div className="row">
            <div className="col-xs-12 col-sm">  
                <ValueBox title="Credits" style={creditsStyle} icon="mi mi-account-balance">{currency} {credits}</ValueBox>
            </div>
            <div className="col-xs-12 col-sm">  
                <ValueBox title="Debts" style={debtsStyle} icon="mi mi-credit-card">{currency} {debts}</ValueBox>
            </div>
            <div className="col-xs-12 col-sm">
                <ValueBox title="Summary" style={summaryStyle} icon="mi mi-attach-money">{currency} {summary}</ValueBox>
            </div>
        </div>
    )
}