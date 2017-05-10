import React, { Component } from 'react'

import {reduxForm, Field as ReduxField} from 'redux-form'

import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardText, CardActions} from 'material-ui/Card'

const saveIcon = <FontIcon className="mi mi-save" />

class BillingCycleForm extends Component {

    render() {
        
        return (
            <form role="form" onSubmit={this.props.handleSubmit}>
                <Card>
                    <CardText className="start-xs">
                        <ReduxField name="name" component="input" />
                        <ReduxField name="month" component="input" />
                        <ReduxField name="year" component="input" />
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