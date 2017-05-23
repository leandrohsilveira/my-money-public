import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {reduxForm, Field as ReduxField, formValueSelector, arrayPush, arrayRemove, reset as resetForm, submit as submitForm} from 'redux-form'

import IconButton from 'react-toolbox/lib/button/IconButton'
import Button from 'react-toolbox/lib/button/Button'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Tabs from 'react-toolbox/lib/tabs/Tabs'
import Tab from 'react-toolbox/lib/tabs/Tab'

import {changeAppBarActions} from '../../layout/layout.actions'
import {BILLING_CYCLE_FORM} from '../billing-cycle.actions'
import Field from '../../widgets/field'
import Summary from '../../widgets/summary'
import MovementFormTab from './movement-form-tab.container'

const saveIcon = <i className="mi mi-save" />
const cancelIcon = <i className="mi mi-close" />


const selector = formValueSelector(BILLING_CYCLE_FORM.NAME)
const mapStateToProps = state => ({
    credits: selector(state, 'credits'), 
    debts: selector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({
    formPush: arrayPush, 
    formRemove: arrayRemove,
    formReset: resetForm,
    formSubmit: submitForm,
    changeAppBarActions
}, dispatch)

@reduxForm({form: BILLING_CYCLE_FORM.NAME})
export class BillingCycleFormActions extends Component {

    render() {
        const {submitIcon, invalid, onSubmit} = this.props
        return (
            <div className="app-actions">
                <IconButton icon={submitIcon} onClick={onSubmit} inverse />
            </div>
        )
    }
}

@reduxForm({form: BILLING_CYCLE_FORM.NAME})
@connect(mapStateToProps, mapDispatchToProps)
export default class BillingCycleForm extends Component {

    state = {
        selectedTab: 0
    }

    componentWillMount = () => {
        const {submitIcon, formSubmit, changeAppBarActions} = this.props
        changeAppBarActions(<BillingCycleFormActions submitIcon={submitIcon} onSubmit={() => formSubmit(BILLING_CYCLE_FORM.NAME)} />)
    }

    componentWillUnmount = () => {
        this.props.changeAppBarActions(null)
    }

    handleTabChange = (tab) => {
        this.setState({selectedTab: tab})
    }

    handleReset = () => {
        this.props.formReset(BILLING_CYCLE_FORM.NAME)
    }

    handleAddMovement = (field, value) => {
        this.props.formPush(BILLING_CYCLE_FORM.NAME, field, value)
    }

    handleDeleteMovement = (field, index) => {
        this.props.formRemove(BILLING_CYCLE_FORM.NAME, field, index)
    }

    render = () => {
        const {
            props: {
                handleSubmit,
                readOnly,
                credits,
                debts,
                onCancel,
                invalid,
                submitText,
                submitIcon,
                submitting
            },
            state: {
                selectedTab
            },
            handleTabChange,
            handleReset,
            handleAddMovement,
            handleDeleteMovement
        } = this
        return (
            <form role="form" onSubmit={handleSubmit} noValidate>
                <Tabs index={selectedTab} fixed hideMode="display" onChange={handleTabChange}>
                    <Tab label="Summary" icon="attach_money">
                        <div className="row padding-top">
                            <div className="col-xs-6 col-sm-8 col-md-9">
                                <Field name="name" label="Name" type="text" disabled={readOnly} validators={{required: true}} />
                            </div>
                            <div className="col-xs-3 col-sm-2 col-md-1">
                                <Field name="month" type="number" label="Month" validators={{required: true, number: {min: 1, max: 12, int: true}}} disabled={readOnly} />
                            </div>
                            <div className="col-xs-3 col-sm-2 col-md-2">
                                <Field name="year" type="number" label="Year" validators={{required: true, number: {min: 1970, int: true}}} disabled={readOnly} />
                            </div>
                        </div>
                        <div className="row padding-top">
                            <div className="col-xs-12">
                                <Summary currency="R$" 
                                            credits={+credits.reduce((sum, credit) => sum + (+credit.value || 0), 0)} 
                                            debts={+debts.reduce((sum, debt) => sum + (+debt.value || 0), 0)} />
                            </div>
                        </div>
                        <div className="row end-xs padding-top">
                                {submitting ? (
                                    <div className="col-xs-3">
                                        <ProgressBar type='circular' mode='indeterminate' multicolor />
                                    </div>
                                ) : (
                                    <div className="col-xs-12">
                                        {!readOnly ? (
                                            <Button label="Reset" icon="undo" onClick={handleReset} />
                                        ) : false }
                                        <Button label="Cancel" icon="close" onClick={onCancel} />
                                        <Button type="submit" disabled={invalid} icon={submitIcon} raised flat label={submitText || 'Save'} primary={true} />
                                    </div>
                                )}
                        </div>
                    </Tab>
                    <Tab label="Credits" icon="account_balance">
                        <MovementFormTab title="Credits" field="credits" movements={credits} 
                                            readOnly={readOnly} showStatus={false} 
                                            onAdd={handleAddMovement} onDelete={handleDeleteMovement} />
                    </Tab>
                    <Tab label="Credits" icon="credit_card">
                        <MovementFormTab title="Debts" field="debts" movements={debts} 
                                            readOnly={readOnly} showStatus={true} 
                                            onAdd={handleAddMovement} onDelete={handleDeleteMovement} />
                    </Tab>

                </Tabs>
            </form>
        )
    }
}