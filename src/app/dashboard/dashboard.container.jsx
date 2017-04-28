import React, { Component } from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import axios from 'axios'

import Snackbar from 'material-ui/Snackbar'

import {api} from '../configs'
import {changeTitle} from '../layout/layout.actions'
import Summary from '../widgets/summary.component'
import ErrorMessage from '../widgets/error-message.component'

class Dashboard extends Component {


    constructor(props) {
        super(props)

        this.state = {
            credit: 0,
            debt: 0,
            errorResp: null
        }

        this.loadSummary = this.loadSummary.bind(this)
    }

    componentWillMount() {
        this.props.changeTitle("Dashboard")
        this.loadSummary()
    }

    loadSummary() {
        axios.get(api('billing-cycles/summary'))
                .then(resp => {
                    this.setState({...resp.data, errorResp: null})
                })
                .catch(resp => {
                    this.setState({errorResp: resp})
                })
    }

    processResponseError(resp) {
        if(resp == "Error: Network Error") {
            return {message: "Error loading data from the server", duration: null}
        }
    }

    render() {
        return (
            <div>
                <Summary currency="R$" credits={this.state.credit} debts={this.state.debt}></Summary>
                <ErrorMessage resp={this.state.errorResp} processResponseError={this.processResponseError} action="Retry" onAction={this.loadSummary}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({changeTitle}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);