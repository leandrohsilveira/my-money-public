import React, { Component } from 'react'

import {reduxForm, Field as ReduxField} from 'redux-form'

import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardText, CardHeader} from 'material-ui/Card'

import Input from '../widgets/input.component'
import CreditsForm from '../credits/credits-form.component'

const saveIcon = <FontIcon className="mi mi-save" />
const cancelIcon = <FontIcon className="mi mi-close" />

class BillingCycleForm extends Component {

    render() {
        
        return (
            <form role="form" onSubmit={this.props.handleSubmit}>
                <div className="row center-xs">
                    <ReduxField name="name" component={Input} className="col-sm-12 col-md" type="text" label="Name" disabled={this.props.readOnly} />
                    <ReduxField name="month" component={Input} className="col-sm-12 col-md" type="number" label="Month" disabled={this.props.readOnly} />
                    <ReduxField name="year" component={Input} className="col-sm-12 col-md" type="number" label="Year" disabled={this.props.readOnly} />
                </div>
                <div className="row padding-top">
                    <div className="col-sm-12 col-md-6">
                        <Card>
                            <CardHeader title="Credits" />
                            <CardText>
                                <CreditsForm readOnly={this.props.readOnly} />
                            </CardText>
                        </Card>
                    </div>
                </div>
                <div className="row end-xs padding-top">
                    <div className="col-xs-12">
                        {!this.props.readOnly ? (
                            <FlatButton label="Reset" onTouchTap={this.props.onReset} />
                        ) : (
                            <div></div>
                        )}
                        <FlatButton label="Cancel" onTouchTap={this.props.onCancel} />
                        <RaisedButton type="submit" label={this.props.submitText || 'Save'} primary={true} />
                    </div>
                </div>
            </form>
        )
    }

}

export default reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)