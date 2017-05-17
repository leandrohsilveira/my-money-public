import React, {Component} from 'react'

import {Field as ReduxField} from 'redux-form'

import Table from 'react-toolbox/lib/table/Table'
import TableHead from 'react-toolbox/lib/table/TableHead'
import TableRow from 'react-toolbox/lib/table/TableRow'
import TableCell from 'react-toolbox/lib/table/TableCell'
// import Panel from 'react-toolbox/lib/panel/Panel'

import Input from '../widgets/input.component'

class CreditsForm extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h3>Credits</h3>
                </div>
                <div className="col-xs-12">
                    <Table selectable={false}>
                        <TableHead>
                            <TableCell>Name</TableCell>
                            <TableCell>Value</TableCell>
                        </TableHead>
                        {(this.props.credits || []).map((credit, index) => (
                            <TableRow>
                                <TableCell>
                                    <ReduxField name={`credits[${index}].name`} component={Input} type="text" label="Name" disabled={this.props.readOnly} />
                                </TableCell>
                                <TableCell>
                                    <ReduxField name={`credits[${index}].value`} component={Input} type="number" label="Value" disabled={this.props.readOnly} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </div>
            </div>
        )
    }

}

export default CreditsForm