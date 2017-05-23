import React from 'react'

import ValueBox from './value-box'

export default props => {
    
    const creditsStyle = {backgroundColor: '#689F38', color: '#ffffff'}
    const debtsStyle = {backgroundColor: '#D32F2F', color: '#ffffff'}
    const summaryStyle = {backgroundColor: '#455A64', color: '#ffffff'}
    const currency = props.currency || 'R$'
    const credits = props.credits || 0
    const debts = props.debts || 0
    const summary = credits - debts

    return (
        <div className="row">
            <div className="col-xs-12 col-sm">  
                <ValueBox title="Credits" style={creditsStyle} icon="mi mi-account-balance mi-48">{currency} {credits}</ValueBox>
            </div>
            <div className="col-xs-12 col-sm">  
                <ValueBox title="Debts" style={debtsStyle} icon="mi mi-credit-card mi-48">{currency} {debts}</ValueBox>
            </div>
            <div className="col-xs-12 col-sm">
                <ValueBox title="Summary" style={summaryStyle} icon="mi mi-attach-money mi-48">{currency} {summary}</ValueBox>
            </div>
        </div>
    )
}