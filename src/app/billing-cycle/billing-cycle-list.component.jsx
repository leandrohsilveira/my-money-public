import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import {Card} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const BillingCycleListItem = props => (
    <ListItem primaryText={props.billingCycle.name} />
)

const loadMoreIcon = (
    <FontIcon className="mi mi-expand-more" />
)

export default props => {
    const billingCycles = props.billingCycles || []
    console.debug('Rendering BillingCycleListTab', billingCycles)
    const rows = billingCycles.map(billingCycle => (
        <BillingCycleListItem key={billingCycle._id} billingCycle={billingCycle} />
    ))
    if(!rows.length) {
        rows.push((
            <ListItem key={-1} primaryText="No results found" /> 
        ))
    }

    return (
        <div className="content">
            <Card>
                <List>
                    {rows}
                </List>
            </Card>
            <RaisedButton disabled={props.allBillingCyclesLoaded} 
                            onTouchTap={props.onNextBillingCyclesPage}
                            primary={true} 
                            icon={loadMoreIcon} 
                            label="Load more" />
        </div>
    )
}