import React, {Component} from 'react'

import {Field as ReduxField} from 'redux-form'

import Input from '../widgets/input.component'

class CreditsForm extends Component {

    constructor(props) {
        super(props)
        
    }

    renderRows() {
        return (
            <div className="row">
                <ReduxField name="credits[0].name" component={Input} className="col-xs-4" type="text" label="Name" disabled={this.props.readOnly} />
                <ReduxField name="credits[0].value" component={Input} className="col-xs-4" type="number" label="Value" disabled={this.props.readOnly} />
                <div className="col-xs-4">
                </div>
            </div>
        )
    }

    render() {
        
        return (
            <div className="row">
                <div className="col-xs-12">
                    {this.renderRows()}
                </div>
            </div>
        )
    }

}

export default CreditsForm