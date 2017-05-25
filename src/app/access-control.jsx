import React, {Component} from 'react'
import axios from 'axios'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import AuthForm from './auth/auth-form'
import {validateToken} from './auth/auth.actions'

const mapStateToProps = state => ({user: state.auth.user, validToken: state.auth.validToken})
const mapDispatchToProps = dispatch => bindActionCreators({validateToken}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AccessControl extends Component {

    componentWillMount = () => {
        const {user, validateToken} = this.props
        if(user) {
            validateToken(user.token)
        }
    }

    render() {
        const {user, validToken, children} = this.props
        if(user && validToken) {
            axios.defaults.headers.common['authorization'] = user.token
            return children
        } else if(!user && !validToken) {
            return <AuthForm />
        } else {
            return false
        }
    }

}