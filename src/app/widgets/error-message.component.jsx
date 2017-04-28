import React, { Component } from 'react'

import Snackbar from 'material-ui/Snackbar'

export default class ErrorMessage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            message: '',
            duration: 5000
        }

        this.handleRequestClose = this.handleRequestClose.bind(this)
        this.handleActionTouchTap = this.handleActionTouchTap.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.resp) {
            if(typeof this.props.processResponseError === 'function') {
                this.setState({...this.props.processResponseError(nextProps.resp), open: true})
            } else if (typeof nextProps.resp === 'string') {
                this.setState({message: nextProps.resp, open: true})
            } else {
                this.setState({message: nextProps.resp.toString(), open: true})
            }
        } else {
            this.setState({open: false})
        }
    }

    handleRequestClose(e) {
        this.setState({open: false, message: ''})
        if(typeof this.props.onRequestClose === 'function') {
            this.props.onRequestClose(e)
        }
    }

    handleActionTouchTap(e) {
        if(typeof this.props.onAction === 'function') {
            this.setState({open: false})
            setTimeout(() => {
                this.props.onAction(e)
            }, 300)
        }
    }

    render() {
        return (
            <Snackbar open={this.state.open} 
                            autoHideDuration={this.props.autoHideDuration}
                            onRequestClose={this.handleRequestClose}
                            autoHideDuration={this.state.duration} 
                            action={this.props.action}
                            onActionTouchTap={this.handleActionTouchTap}
                            message={this.state.message} />
        )
    }

}