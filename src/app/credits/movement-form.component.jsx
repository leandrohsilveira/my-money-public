import React, {Component} from 'react'

import {Field as ReduxField} from 'redux-form'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'

import Input from '../widgets/input.component'
import Select from '../widgets/select.component'

const statusOptions = [
    {label: 'Pending payment', value: 'PENDING'},
    {label: 'Paid', value: 'PAID'},
    {label: 'Payment scheduled', value: 'SCHEDULED'}
]

export default props => (
    <Table selectable={props.selectable} multiSelectable={true} onRowSelect={props.onMovementSelect}>
        <TableHead>
            <TableCell colSpan="2">Movements</TableCell>
        </TableHead>
        {(props.movements || []).map((movement, index) => (
            <TableRow key={index} selected={(props.selected || []).indexOf(index) !== -1}>
                <TableCell>
                    <ReduxField name={`${props.field}[${index}].name`} component={Input} type="text" label="Name" disabled={props.readOnly} />
                </TableCell>
                <TableCell>
                    <ReduxField name={`${props.field}[${index}].value`} component={Input} type="number" label="Value" disabled={props.readOnly} />
                </TableCell>
                { props.showStatus ? (
                    <TableCell>
                        <ReduxField name={`${props.field}[${index}].status`} component={Select} label="Status" options={statusOptions} />
                    </TableCell>
                ) : false }
            </TableRow>
        ))}
    </Table>
)