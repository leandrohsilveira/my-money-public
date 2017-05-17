import React, { Component } from 'react'

import {connect} from 'react-redux'

import {reduxForm, Field as ReduxField, formValueSelector} from 'redux-form'

import Button from 'react-toolbox/lib/button/Button'

import Input from '../widgets/input.component'
import CreditsForm from '../credits/credits-form.component'

const saveIcon = <i className="mi mi-save" />
const cancelIcon = <i className="mi mi-close" />

class BillingCycleForm extends Component {

    render() {
        
        return (
            <form role="form" onSubmit={this.props.handleSubmit}>
                <div className="row center-xs">
                    <div className="col-sm-12 col-md padding">
                        <ReduxField name="name" component={Input} className="col-sm-12 col-md padding" type="text" label="Name" disabled={this.props.readOnly} />
                    </div>
                    <div className="col-sm-12 col-md padding">
                        <ReduxField name="month" component={Input} className="col-sm-12 col-md padding" type="number" label="Month" disabled={this.props.readOnly} />
                    </div>
                    <div className="col-sm-12 col-md padding">
                        <ReduxField name="year" component={Input} className="col-sm-12 col-md padding" type="number" label="Year" disabled={this.props.readOnly} />
                    </div>
                </div>
                <div className="row padding-top">
                    <div className="col-sm-12 col-md-6">
                        <CreditsForm readOnly={this.props.readOnly} credits={this.props.credits} />
                    </div>
                </div>
                <div className="row end-xs padding-top">
                    <div className="col-xs-12">
                        {!this.props.readOnly ? (
                            <Button label="Reset" onClick={this.props.onReset} />
                        ) : (
                            <div></div>
                        )}
                        <Button label="Cancel" onClick={this.props.onCancel} />
                        <Button type="submit" raised flat label={this.props.submitText || 'Save'} primary={true} />
                    </div>
                </div>
            </form>
        )
    }

}

const selector = formValueSelector('billingCycleForm')
const mapStateToProps = state => ({credits: selector(state, 'credits')})

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
BillingCycleForm = connect(mapStateToProps)(BillingCycleForm)
export default BillingCycleForm