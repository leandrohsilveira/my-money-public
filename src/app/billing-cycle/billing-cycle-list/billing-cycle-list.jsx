import React from 'react'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'

export default props => (
    <Table multiSelectable={false} onRowSelect={props.onSelect} selected={props.selected}>
        <TableHead>
            <TableCell>Name</TableCell>
            <TableCell numeric>Month</TableCell>
            <TableCell numeric>Year</TableCell>
        </TableHead>
        {(props.billingCycles || []).map((billingCycle, index) => (
            <TableRow key={billingCycle._id} selected={(props.selected || []).indexOf(index) !== -1}>
                <TableCell>{billingCycle.name}</TableCell>
                <TableCell numeric>{billingCycle.month}</TableCell>
                <TableCell numeric>{billingCycle.year}</TableCell>
            </TableRow>
        ))}
    </Table>
)