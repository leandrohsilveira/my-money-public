import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {reduxForm, Field as ReduxField, formValueSelector, arrayPush, arrayRemove, reset as resetForm, submit as submitForm} from 'redux-form'

import IconButton from 'react-toolbox/lib/button/IconButton'
import IconMenu from 'react-toolbox/lib/menu/IconMenu'
import MenuItem from 'react-toolbox/lib/menu/MenuItem'
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
        const {submitIcon, submitText, invalid, readOnly, onSubmit, onReset, onCancel} = this.props
        return (
            <div>
                <IconButton icon={submitIcon} onClick={onSubmit} inverse />
                <IconMenu icon="more_vert" position="topRight" menuRipple inverse>
                    <MenuItem caption="Undo all changes" icon="undo" onClick={onReset} disabled={readOnly} />
                    <MenuItem caption="Cancel" icon="close" onClick={onCancel} />
                </IconMenu>
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

    componentDidMount = () => {
        const {submitIcon, submitText, formSubmit, readOnly, onCancel, changeAppBarActions} = this.props
        const appBarActions = (
            <BillingCycleFormActions submitIcon={submitIcon} submitText={submitText}
                                    readOnly={readOnly}
                                    onReset={this.handleReset}
                                    onCancel={onCancel}
                                    onSubmit={() => formSubmit(BILLING_CYCLE_FORM.NAME)} />
        )
        changeAppBarActions(appBarActions)
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
                            <div className="col-xs-12 col-sm-6 col-md-8">
                                <Field name="name" label="Name" type="text" disabled={readOnly} validators={{required: true}} />
                            </div>
                            <div className="col-xs-6 col-sm-3 col-md-2">
                                <Field name="month" type="number" label="Month" validators={{required: true, number: {min: 1, max: 12, int: true}}} disabled={readOnly} />
                            </div>
                            <div className="col-xs-6 col-sm-3 col-md-2">
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