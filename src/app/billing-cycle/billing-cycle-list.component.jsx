import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import {Card} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List';

const BillingCycleListItem = props => (
    <ListItem primaryText={props.billingCycle.name} />
)

export default props => {
    const billingCycles = props.billingCycles || []
    console.debug('Rendering BillingCycleList', billingCycles)
    const rows = billingCycles.map(billingCycle => (
        <BillingCycleListItem key={billingCycle._id} billingCycle={billingCycle} />
    ))
    if(!rows.length) {
        rows.push((
            <ListItem key={-1} primaryText="No results found" /> 
        ))
    }

    return (
        <Card>
            <List>
                {rows}
            </List>
        </Card>
    )
}