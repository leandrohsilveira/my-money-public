import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {changeTitle} from '../layout/layout.actions'
import {onBillingCycleFetch} from './billing-cycle.actions'

import ErrorMessage from '../widgets/error-message.component'
import BillingCycleTabs from './billing-cycle-tabs/billing-cycle-tabs.component'


class BillingCycle extends Component {
    
    constructor(props) {
        super(props)
        this.handleNextBillingCyclesPage = this.handleNextBillingCyclesPage.bind(this)
    }
    
    componentWillMount() {
        this.props.changeTitle("Billing cycles")
        this.handleNextBillingCyclesPage()
    }

    handleNextBillingCyclesPage() {
        if(!this.props.allBillingCyclesLoaded) {
            console.debug('handleNextBillingCyclesPage(), this.props.page:', this.props.page + 1)
            this.props.onBillingCycleFetch(this.props.page + 1);
        }
    }

    processResponseError(resp) {
        if(resp == "Error: Network Error") {
            return {message: "The data service is temporarily unavailable", duration: null}
        }
    }

    render() {
        return (
            <div>
                <BillingCycleTabs billingCycles={this.props.billingCycles} 
                                    onNextBillingCyclesPage={this.handleNextBillingCyclesPage}
                                    allBillingCyclesLoaded={this.props.allBillingCyclesLoaded} />
                <ErrorMessage resp={this.props.errorResp} processResponseError={this.processResponseError} action="Retry" onRequestClose={this.handleNextBillingCyclesPage} onAction={this.handleNextBillingCyclesPage}/>
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    billingCycles: state.billingCycle.billingCycles, 
    page: state.billingCycle.page,
    allBillingCyclesLoaded: state.billingCycle.allBillingCyclesLoaded,
    errorResp: state.billingCycle.errorResp
})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle, onBillingCycleFetch}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycle);