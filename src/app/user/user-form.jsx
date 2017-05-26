import React, { Component } from 'react'
import { reduxForm, formValueSelector, reset as resetForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import Button from 'react-toolbox/lib/button/Button'

import {changeTitle} from '../layout/layout.actions'
import {signUp, AUTH_FORM} from './auth.actions'
import Field from '../widgets/field'

const selector = formValueSelector(AUTH_FORM.NAME)
const mapStateToProps = state => ({password: selector(state, 'password')})
const mapDispatchToProps = dispatch => bindActionCreators({ signUp, changeTitle, resetForm }, dispatch)

@reduxForm({ form: AUTH_FORM.NAME })
@connect(mapStateToProps, mapDispatchToProps)
export default class UserForm extends Component {

    componentWillMount = () => {
        const {changeTitle, title} = this.props
        changeTitle(title)
    }

    onSubmit = (values) => {
        const { signUp, onSignUp } = this.props
        if(typeof onSignUp === 'function') {
            signUp(values, onSignUp)
        } else {
            signUp(values)
        }
    }

    render() {
        const { handleSubmit, invalid, password } = this.props
        const { onSubmit } = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                        <form novalidate onSubmit={handleSubmit(values => onSubmit(values))}>
                            <Card>
                                <CardText>
                                    <Field name="username" label="Username" icon="account_box" validators={{required: true}} />
                                    <Field name="email" label="E-mail" type="email" icon="email" validators={{required: true, email: true}} />
                                    <Field name="password" label="Password" type="password" icon="vpn_key" validators={{required: true, password: true}} />
                                    <Field name="confirmPassword" label="Confirm password" type="password" icon="check_circle" validators={{required: true, password: true, match: {name: "Password", value: password}}} />
                                </CardText>
                                <CardActions>
                                    <Button disabled={invalid} label="Register" type="submit" raised primary />
                                    <Button label="Sign-in" flat href="#/login" />
                                </CardActions>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}