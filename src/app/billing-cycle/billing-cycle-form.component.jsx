import React, { Component } from 'react'

import {reduxForm, Field as ReduxField} from 'redux-form'

import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardText, CardActions} from 'material-ui/Card'

import Input from '../widgets/input.component'

const saveIcon = <FontIcon className="mi mi-save" />

class BillingCycleForm extends Component {

    render() {
        
        return (
            <form role="form" onSubmit={this.props.handleSubmit}>
                <Card>
                    <CardText>
                        <div className="row center-xs">
                            <div className="col-sm-12 col-md">
                                <ReduxField name="name" component={Input} type="text" label="Name" />
                            </div>
                            <div className="col-sm-12 col-md">
                                <ReduxField name="month" component={Input} type="number" label="Month" />
                            </div>
                            <div className="col-sm-12 col-md">
                                <ReduxField name="year" component={Input} type="number" label="Year" />
                            </div>
                        </div>
                    </CardText>
                    <CardActions className="end-xs">
                        <FlatButton label="Cancel" />
                        <RaisedButton type="submit" label="Save" primary={true} icon={saveIcon} />
                    </CardActions>
                </Card>
            </form>
        )
    }

}

export default reduxForm({form: 'billingCycleForm'})(BillingCycleForm)