import React, { Component } from 'react'

import {reduxForm, Field as ReduxField} from 'redux-form'

import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardText, CardActions} from 'material-ui/Card'

import Input from '../widgets/input.component'

const saveIcon = <FontIcon className="mi mi-save" />
const cancelIcon = <FontIcon className="mi mi-close" />

class BillingCycleForm extends Component {

    render() {
        
        return (
            <form role="form" onSubmit={this.props.handleSubmit}>
                <Card>
                    <CardText>
                        <div className="row center-xs">
                            <div className="col-sm-12 col-md">
                                <ReduxField name="name" component={Input} type="text" label="Name" disabled={this.props.readOnly} />
                            </div>
                            <div className="col-sm-12 col-md">
                                <ReduxField name="month" component={Input} type="number" label="Month" disabled={this.props.readOnly} />
                            </div>
                            <div className="col-sm-12 col-md">
                                <ReduxField name="year" component={Input} type="number" label="Year" disabled={this.props.readOnly} />
                            </div>
                        </div>
                    </CardText>
                    <CardActions className="end-xs">
                        {!this.props.readOnly ? (
                            <FlatButton label="Reset" onTouchTap={this.props.onReset} />
                        ) : (
                            <div></div>
                        )}
                        <FlatButton label="Cancel" onTouchTap={this.props.onCancel} icon={cancelIcon} />
                        <RaisedButton type="submit" label={this.props.submitText || 'Save'} primary={true} icon={saveIcon} />
                    </CardActions>
                </Card>
            </form>
        )
    }

}

export default reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)