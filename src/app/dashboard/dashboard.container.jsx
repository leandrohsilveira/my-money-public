import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Snackbar from 'material-ui/Snackbar'

import {changeTitle} from '../layout/layout.actions'
import {onSummaryLoad} from './dashboard.actions'

import Summary from '../widgets/summary.component'
import ErrorMessage from '../widgets/error-message.component'

class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.changeTitle("Dashboard")
        this.props.onSummaryLoad()
    }

    processResponseError(resp) {
        if(resp == "Error: Network Error") {
            return {message: "The data service is temporarily unavailable", duration: null}
        }
    }

    render() {
        return (
            <div className="content">
                <Summary currency="R$" credits={this.props.summary.credit} debts={this.props.summary.debt}></Summary>
                <ErrorMessage resp={this.props.errorResp} processResponseError={this.processResponseError} action="Retry" onRequestClose={this.props.onSummaryLoad} onAction={this.props.onSummaryLoad}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({summary: state.dashboard.summary, errorResp: state.dashboard.errorResp})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle, onSummaryLoad}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);