import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import {Card} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

const MORE_ACTION_ICON_BUTTON = (
  <IconButton
    touch={true}
    tooltip="Actions"
    tooltipPosition="bottom-left">
    <FontIcon className="mi mi-more-vert" />
  </IconButton>
);

const BillingCycleListItem = props => {
    const moreActionsMenu = (
        <IconMenu iconButtonElement={MORE_ACTION_ICON_BUTTON}>
            <MenuItem onTouchTap={() => props.onEdit(props.billingCycle)}>Edit</MenuItem>
            <MenuItem onTouchTap={() => props.onDelete(props.billingCycle)}>Delete</MenuItem>
        </IconMenu>
    )
    return (
        <ListItem primaryText={props.billingCycle.name} secondaryText={`${props.billingCycle.month}/${props.billingCycle.year}`} rightIconButton={moreActionsMenu} />
    )
}

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
        <List>
            {rows}
        </List>
    )
}