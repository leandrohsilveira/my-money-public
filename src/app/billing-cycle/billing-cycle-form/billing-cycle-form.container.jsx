import React, {Component} from 'react'

import BillingCycleForm from './billing-cycle-form'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {changeTitle} from '../../layout/layout.actions'
import {
    createBillingCycle, 
    updateBillingCycle,
    deleteBillingCycle,
    retrieveBillingCycle,
    initializeForm
} from '../billing-cycle.actions'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({
    changeTitle,
    createBillingCycle,
    updateBillingCycle,
    deleteBillingCycle,
    retrieveBillingCycle,
    initializeForm
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BillingCycleFormContainer extends Component {

    componentWillMount = () => {
        this.props.initializeForm()
        switch(this.props.type) {
            case 'UPDATE':
                this.props.changeTitle('Update a billing cycle')
                break
            case 'DELETE':
                this.props.changeTitle('Delete a billing cycle')
                break
            case 'CREATE': 
            default:
                this.props.changeTitle('Create new billing cycle')
                break
        }
    }

    componentDidMount = () => {
        if(this.props.id) {
            this.props.retrieveBillingCycle(this.props.id)
        }
    }

    handleSubmit = (values) => {
        const callback = (resp) => {
            this.goBack()
            return resp
        }

        switch(this.props.type) {
            case 'UPDATE':
                this.props.updateBillingCycle(values, callback)
                break
            case 'DELETE':
                this.props.deleteBillingCycle(values, callback)
                break
            case 'CREATE': 
            default:
                this.props.createBillingCycle(values, callback)
                break
        }


    }

    goBack = () => this.props.history.push('/billing-cycles')

    render = () => (
        <div className="content">
            <div className="row center-xs">
                <div className="col-xs-12">
                    <BillingCycleForm submitText={this.props.type} submitIcon={this.props.type === 'DELETE' ? 'delete' : 'check'}
                                                    readOnly={this.props.type == 'DELETE'} 
                                                    onSubmit={this.handleSubmit} 
                                                    onCancel={this.goBack} />
                </div>
            </div>
        </div>
    )

}