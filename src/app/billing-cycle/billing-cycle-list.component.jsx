import React from 'react'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'

/*const MORE_ACTION_ICON_BUTTON = (
  <IconButton
    touch={true}
    tooltip="Actions"
    tooltipPosition="bottom-left">
    <FontIcon value="mi mi-more-vert" />
  </IconButton>
);*/

const BillingCycleModel = {
  name: {type: String},
  month: {type: Number},
  year: {type: Number}
};

// const BillingCycleListItem = props => {
//     const moreActionsMenu = [
//         <MenuItem onTouchTap={() => props.onEdit(props.billingCycle)}>Edit</MenuItem>,
//         <MenuItem onTouchTap={() => props.onDelete(props.billingCycle)}>Delete</MenuItem>
//     ]
//     return (
//         <ListItem caption={props.billingCycle.name} legend={`${props.billingCycle.month}/${props.billingCycle.year}`} rightActions={moreActionsMenu} />
//     )
// }

export default props => {
    const billingCycles = props.billingCycles || []
    // const rows = billingCycles.map(billingCycle => (
    //     <BillingCycleListItem key={billingCycle._id} onEdit={props.onEdit} onDelete={props.onDelete} billingCycle={billingCycle} />
    // ))
    // if(!rows.length) {
    //     rows.push((
    //         <ListItem key={-1} caption="No results found" /> 
    //     ))
    // }

    return (
        
        <Table multiSelectable={false}>
            <TableHead>
                <TableCell>Name</TableCell>
                <TableCell numeric>Month</TableCell>
                <TableCell numeric>Year</TableCell>
            </TableHead>
            {billingCycles.map(billingCycle => (
                <TableRow key={billingCycle._id}>
                    <TableCell>{billingCycle.name}</TableCell>
                    <TableCell numeric>{billingCycle.month}</TableCell>
                    <TableCell numeric>{billingCycle.year}</TableCell>
                </TableRow>
            ))}
        </Table>
    )
}