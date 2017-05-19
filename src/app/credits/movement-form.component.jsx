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
            <TableCell>Movements</TableCell>
        </TableHead>
        {(props.movements || []).map((movement, index) => (
            <TableRow key={index} selected={(props.selected || []).indexOf(index) !== -1}>
                <TableCell>
                    <div className="row">
                        <div className={`col-xs-12 col-sm-${(props.showStatus ? '6' : '8')}`}>
                            <ReduxField name={`${props.field}[${index}].name`} component={Input} type="text" label="Name" required={true} disabled={props.readOnly} />
                        </div>
                        <div className={`col-xs-12 col-sm-${(props.showStatus ? '3' : '4')}`}>
                            <ReduxField name={`${props.field}[${index}].value`} component={Input} type="number" label="Value" required={true} disabled={props.readOnly} />
                        </div>
                        { props.showStatus && (
                            <div className='col-xs-12 col-sm-3'>
                                <ReduxField name={`${props.field}[${index}].status`} component={Select} label="Status" required={true} options={statusOptions} />
                            </div>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        ))}
    </Table>
)