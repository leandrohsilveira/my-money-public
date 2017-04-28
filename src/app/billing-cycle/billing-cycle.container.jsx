import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {changeTitle} from '../layout/layout.actions'

import BillingCycleTabs from './billing-cycle-tabs.component'


class BillingCycle extends Component {
    
    constructor(props) {
        super(props)
    }
    
    componentWillMount() {
        this.props.changeTitle("Billing cycle")
    }

    render() {
        return (
            <BillingCycleTabs />
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycle);