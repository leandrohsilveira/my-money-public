import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {changeTitle, changeAppBarActions} from '../layout/layout.actions'
import {onSummaryLoad} from './dashboard.actions'

import IconButton from 'react-toolbox/lib/button/IconButton'

import Summary from '../widgets/summary'
// import ErrorMessage from '../widgets/error-message.component'

const mapStateToProps = state => ({summary: state.dashboard.summary, errorResp: state.dashboard.errorResp})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle, changeAppBarActions, onSummaryLoad}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends Component {

    componentWillMount = () => {
        this.props.changeTitle("Dashboard")
        this.props.onSummaryLoad()
    }
    
    componentDidMount = () => {
        this.props.changeAppBarActions((
            <IconButton icon="refresh" onClick={this.props.onSummaryLoad} inverse />
        ))
    }

    componentWillUnmount = () => {
        this.props.changeAppBarActions(null)
    }

    processResponseError = (resp) => {
        if(resp == "Error: Network Error") {
            return {message: "The data service is temporarily unavailable", duration: null}
        }
    }

    render = () => (
        <div className="content">
            <Summary currency="R$" credits={this.props.summary.credit} debts={this.props.summary.debt}></Summary>
        </div>
    )
}