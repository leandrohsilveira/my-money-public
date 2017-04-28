import React from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const BillingCycleTableRow = props => (
    <TableRow key={props.billingCycle._id}>
        <TableRowColumn>{props.billingCycle.name}</TableRowColumn>
    </TableRow>
)

export default props => {
    const billingCycles = props.billingCycles || []
    const rows = billingCycles.map(billingCycle => (
        <BillingCycleTableRow billingCycle={billingCycle} />
    ))
    if(!rows.length) {
        rows.push((
            <TableRow key={-1}>
                <TableRowColumn>{"No results found"}</TableRowColumn>
            </TableRow>
        ))
    }

    return (
        <div className="content">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn columnNumber={1}>
                            Name
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </div>
    )
}