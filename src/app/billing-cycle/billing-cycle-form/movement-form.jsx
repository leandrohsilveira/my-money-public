import React, {Component} from 'react'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'

import Field from '../../widgets/field'

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
                            <Field name={`${props.field}[${index}].name`} type="text" label="Name" disabled={props.readOnly} validators={{required: true}} />
                        </div>
                        <div className={`col-xs-12 col-sm-${(props.showStatus ? '3' : '4')}`}>
                            <Field name={`${props.field}[${index}].value`} type="number" label="Value" disabled={props.readOnly} validators={{required: true, number: {min: 0}}} />
                        </div>
                        { props.showStatus && (
                            <div className='col-xs-12 col-sm-3'>
                                <Field name={`${props.field}[${index}].status`} label="Status" disabled={props.readOnly} options={statusOptions} validators={{required: true}} />
                            </div>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        ))}
    </Table>
)