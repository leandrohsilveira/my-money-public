import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {reduxForm, Field as ReduxField, formValueSelector, arrayPush, arrayRemove, reset as resetForm} from 'redux-form'

import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'

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
        selectedDebts: []
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
                this.props.formPush(BILLING_CYCLE_FORM.NAME, 'credits', credit)
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
            <div className="row padding-top">
                <div className="col-sm-12">
                    <Summary currency="R$" 
                                credits={+this.props.credits.reduce((sum, credit) => sum + (+credit.value || 0), 0)} 
                                debts={+this.props.debts.reduce((sum, debt) => sum + (+debt.value || 0), 0)} />
                </div>
            </div>
            <div className="row padding-top">
                <div className="col-sm-12">
                    <Card>
                        <CardText>
                            <div className="row">
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
                        </CardText>
                        <CardActions>
                            <Button type="submit" icon={this.props.submitIcon} raised flat label={this.props.submitText || 'Save'} primary={true} />
                            <Button label="Cancel" icon="close" onClick={this.props.onCancel} />
                            {!this.props.readOnly ? (
                                <Button label="Reset" icon="undo" onClick={this.handleReset} />
                            ) : false }
                        </CardActions>
                    </Card>
                </div>
            </div>
            <div className="row padding-top">
                <div className="col-sm-12 col-md-6">
                    <Card>
                        <CardTitle title="Credits" />
                        <CardText>
                            <MovementForm readOnly={this.props.readOnly} 
                                            selectable={!this.props.readOnly}
                                            selected={this.state.selectedCredits} 
                                            onMovementSelect={this.handleCreditSelect} 
                                            field='credits'
                                            movements={this.props.credits} />
                        </CardText>
                        <CardActions>
                            <Button label="Add credit" onClick={this.handleAddCredit} flat raised inverse disabled={this.props.readOnly} />
                            <Button label="Duplicate" onClick={this.handleDuplicateCredit} flat disabled={this.props.readOnly || !this.state.selectedCredits.length} />
                            <Button label="Remove" onClick={this.handleDeleteCredit} flat disabled={this.props.readOnly || !this.state.selectedCredits.length} />
                        </CardActions>
                    </Card>
                </div>
                <div className="col-sm-12 col-md-6">
                    <Card>
                        <CardTitle title="Debts" />
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
                            <Button label="Add debt" onClick={this.handleAddDebt} flat raised inverse disabled={this.props.readOnly} />
                            <Button label="Duplicate" onClick={this.handleDuplicateDebt} flat disabled={this.props.readOnly || !this.state.selectedDebts.length} />
                            <Button label="Remove" onClick={this.handleDeleteDebt} flat disabled={this.props.readOnly || !this.state.selectedDebts.length || this.props.debts.length <= 1} />
                        </CardActions>
                    </Card>
                </div>
            </div>
        </form>
    )

}