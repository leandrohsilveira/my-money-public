import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {changeTitle} from '../layout/layout.actions'
import {onBillingCycleFetch} from './billing-cycle.actions'

import BillingCycleTabs from './billing-cycle-tabs.component'


class BillingCycle extends Component {
    
    constructor(props) {
        super(props)
        this.handleNextBillingCyclesPage = this.handleNextBillingCyclesPage.bind(this)
    }
    
    componentWillMount() {
        this.props.changeTitle("Billing cycle")
        this.handleNextBillingCyclesPage()
    }

    handleNextBillingCyclesPage() {
        if(!this.props.allBillingCyclesLoaded) {
            console.debug('handleNextBillingCyclesPage(), this.props.page:', this.props.page + 1)
            this.props.onBillingCycleFetch(this.props.page + 1);
        }
    }

    render() {
        return (
            <BillingCycleTabs billingCycles={this.props.billingCycles} 
                                onNextBillingCyclesPage={this.handleNextBillingCyclesPage}
                                allBillingCyclesLoaded={this.props.allBillingCyclesLoaded} />
        )
    }
}

const mapStateToProps = state => ({
    billingCycles: state.billingCycle.billingCycles, 
    page: state.billingCycle.page,
    allBillingCyclesLoaded: state.billingCycle.allBillingCyclesLoaded
})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle, onBillingCycleFetch}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycle);