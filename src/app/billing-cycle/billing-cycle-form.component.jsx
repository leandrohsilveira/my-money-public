import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {reduxForm, Field as ReduxField, formValueSelector, arrayPush, arrayRemove, reset as resetForm} from 'redux-form'

import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'

import Tabs from 'react-toolbox/lib/tabs/Tabs'
import Tab from 'react-toolbox/lib/tabs/Tab'

import {BILLING_CYCLE_FORM} from './billing-cycle.actions'
import Input from '../widgets/input.component'
import MovementForm from '../credits/movement-form.component'
import Summary from '../widgets/summary.component'

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
    formReset: resetForm
}, dispatch)

@reduxForm({form: BILLING_CYCLE_FORM.NAME, destroyOnUnmount: false})
@connect(mapStateToProps, mapDispatchToProps)
export default class BillingCycleForm extends Component {

    state = {
        selectedCredits: [],
        selectedDebts: [],
        selectedTab: 0
    }

    handleTabChange = (tab) => {
        this.setState({selectedTab: tab})
    }

    handleReset = () => {
        this.props.formReset(BILLING_CYCLE_FORM.NAME)
    }

    handleCreditSelect = (selected) => {
        this.setState({selectedCredits: selected.sort((a, b) => b - a).filter(item => typeof item === 'number')})

    }
    handleDebtSelect = (selected) => {
        this.setState({selectedDebts: selected.sort((a, b) => b - a).filter(item => typeof item === 'number')})
 
   }
    handleAddCredit = () => {
        this.props.formPush(BILLING_CYCLE_FORM.NAME, 'credits', {})
    }

    handleAddDebt = () => {
        this.props.formPush(BILLING_CYCLE_FORM.NAME, 'debts', {})
    }

    handleDuplicateCredit = () => {
        if(this.state.selectedCredits.length) {
            this.state.selectedCredits.forEach(index => {
                const credit = this.props.credits[index]
                this.props.formPush(BILLING_TabsCYCLE_FORM.NAME, 'credits', credit)
            })
        }
    }

    handleDuplicateDebt = () => {
        if(this.state.selectedDebts.length) {
            this.state.selectedDebts.forEach(index => {
                const debt = this.props.debts[index]
                this.props.formPush(BILLING_CYCLE_FORM.NAME, 'debts', debt)
            })
        }
    }

    handleDeleteCredit = () => {
        if(this.state.selectedCredits.length) {
            this.state.selectedCredits.forEach(index => {
                this.props.formRemove(BILLING_CYCLE_FORM.NAME, 'credits', index)
            })
            this.setState({selectedCredits: []})
        }
    }

    handleDeleteDebt = () => {
        if(this.state.selectedDebts.length) {
            this.state.selectedDebts.forEach(index => {
                this.props.formRemove(BILLING_CYCLE_FORM.NAME, 'debts', index)
            })
            this.setState({selectedDebts: []})
        }
    }

    render = () => (
        <form role="form" onSubmit={this.props.handleSubmit}>
            <Tabs index={this.state.selectedTab} fixed onChange={this.handleTabChange}>
                <Tab label="Summary" icon="attach_money">
                    <div className="row padding-top">
                        <div className="col-xs-6 col-sm-8 col-md-9">
                            <ReduxField name="name" component={Input} type="text" label="Name" disabled={this.props.readOnly} />
                        </div>
                        <div className="col-xs-3 col-sm-2 col-md-1">
                            <ReduxField name="month" component={Input} type="number" label="Month" disabled={this.props.readOnly} />
                        </div>
                        <div className="col-xs-3 col-sm-2 col-md-2">
                            <ReduxField name="year" component={Input} type="number" label="Year" disabled={this.props.readOnly} />
                        </div>
                    </div>
                    <div className="row padding-top">
                        <div className="col-sm-12">
                            <Summary currency="R$" 
                                        credits={+this.props.credits.reduce((sum, credit) => sum + (+credit.value || 0), 0)} 
                                        debts={+this.props.debts.reduce((sum, debt) => sum + (+debt.value || 0), 0)} />
                        </div>
                    </div>
                    <div className="row end-xs padding-top">
                        <div className="col-xs-12">
                            {!this.props.readOnly ? (
                                <Button label="Reset" icon="undo" onClick={this.handleReset} />
                            ) : false }
                            <Button label="Cancel" icon="close" onClick={this.props.onCancel} />
                            <Button type="submit" icon={this.props.submitIcon} raised flat label={this.props.submitText || 'Save'} primary={true} />
                        </div>
                    </div>
                </Tab>
                <Tab label="Credits" icon="account_balance">
                    <div className="row padding-top">
                        <div className="col-sm-12">
                            <Card>
                                <CardText>
                                    <MovementForm readOnly={this.props.readOnly} 
                                                    selectable={!this.props.readOnly}
                                                    selected={this.state.selectedCredits} 
                                                    onMovementSelect={this.handleCreditSelect} 
                                                    field='credits'
                                                    movements={this.props.credits} />
                                </CardText>
                                <CardActions>
                                    <Button label="Duplicate" onClick={this.handleDuplicateCredit} flat disabled={this.props.readOnly || !this.state.selectedCredits.length} />
                                    <Button label="Remove" onClick={this.handleDeleteCredit} flat disabled={this.props.readOnly || !this.state.selectedCredits.length} />
                                </CardActions>
                            </Card>
                            <Button floating accent icon="add" className="floating bottom right" onClick={this.handleAddCredit} disabled={this.props.readOnly} />
                        </div>
                    </div>
                </Tab>
                <Tab label="Debts" icon="credit_card">
                    <div className="row padding-top">
                        <div className="col-sm-12">
                            <Card>
                                <CardText>
                                    <MovementForm readOnly={this.props.readOnly} 
                                                    selectable={!this.props.readOnly}
                                                    selected={this.state.selectedDebts} 
                                                    onMovementSelect={this.handleDebtSelect} 
                                                    field='debts'
                                                    showStatus={true}
                                                    movements={this.props.debts} />
                                </CardText>
                                <CardActions>
                                    <Button label="Duplicate" onClick={this.handleDuplicateDebt} flat disabled={this.props.readOnly || !this.state.selectedDebts.length} />
                                    <Button label="Remove" onClick={this.handleDeleteDebt} flat disabled={this.props.readOnly || !this.state.selectedDebts.length || this.props.debts.length <= 1} />
                                </CardActions>
                            </Card>
                            <Button floating accent icon="add" className="floating bottom right" onClick={this.handleAddDebt} disabled={this.props.readOnly} />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </form>
    )

}