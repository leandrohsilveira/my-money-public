import React, { Component } from 'react'
import { reduxForm, formValueSelector, reset as resetForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import Button from 'react-toolbox/lib/button/Button'

import {changeTitle} from '../layout/layout.actions'
import { login, signUp, AUTH_FORM } from './auth.actions'
import Field from '../widgets/field'

const selector = formValueSelector(AUTH_FORM.NAME)
const mapStateToProps = state => ({password: selector(state, 'password')})
const mapDispatchToProps = dispatch => bindActionCreators({ login, signUp, changeTitle, resetForm }, dispatch)

@reduxForm({ form: AUTH_FORM.NAME })
@connect(mapStateToProps, mapDispatchToProps)
export default class AuthForm extends Component {

    state = {
        loginMode: true
    }

    componentWillMount = () => {
        const {changeTitle} = this.props
        changeTitle("Sign-in")
    }

    changeMode = () => {
        const {changeTitle, resetForm} = this.props
        resetForm(AUTH_FORM.NAME)
        this.setState({ loginMode: !this.state.loginMode })
        changeTitle(!this.state.loginMode ? "Sign-in" : "Register")
    }

    onSubmit = (values) => {
        const { handleSignIn, handleSignUp } = this
        this.state.loginMode ? handleSignIn(values) : handleSignUp(values)
    }

    handleSignIn = (values) => {
        const {login, onSignIn} = this.props
        login(values)
        if(typeof onSignIn === 'function') {
            onSignIn(values)
        }
    }

    handleSignUp = (values) => {
        const { signUp, onSignUp } = this.props
        const { changeMode } = this
        signUp(values)
        changeMode()
        if(typeof onSignUp === 'function') {
            onSignUp(values)
        }

    }

    render() {
        const { loginMode } = this.state
        const { handleSubmit, invalid, password } = this.props
        const { onSubmit, changeMode } = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                        <form onSubmit={handleSubmit(values => onSubmit(values))}>
                            <Card>
                                <CardText>
                                    <Field name="username" label="Username" icon="account_box" validators={{required: true}} />
                                    {!loginMode && (
                                        <Field name="email" label="E-mail" type="email" icon="email" validators={{required: true, email: true}} />
                                    )}
                                    <Field name="password" label="Password" type="password" icon="vpn_key" validators={{required: true, password: true}} />
                                    {!loginMode && (
                                        <Field name="confirmPassword" label="Confirm password" type="password" icon="check_circle" validators={{required: true, password: true, match: {name: "Password", value: password}}} />
                                    )}
                                </CardText>
                                <CardActions>
                                    <Button disabled={invalid} label={loginMode ? "Sign-in" : "Register"} type="submit" raised primary />
                                    <Button label={loginMode ? "Register" : "Sign-in"} flat onClick={changeMode} />
                                </CardActions>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}