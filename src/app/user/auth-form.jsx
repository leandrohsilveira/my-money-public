import React, { Component } from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import Button from 'react-toolbox/lib/button/Button'

import {changeTitle} from '../layout/layout.actions'
import { login, AUTH_FORM } from './auth.actions'
import Field from '../widgets/field'

const selector = formValueSelector(AUTH_FORM.NAME)
const mapStateToProps = state => ({password: selector(state, 'password')})
const mapDispatchToProps = dispatch => bindActionCreators({ login, changeTitle }, dispatch)

@reduxForm({ form: AUTH_FORM.NAME })
@connect(mapStateToProps, mapDispatchToProps)
export default class AuthForm extends Component {

    componentWillMount = () => {
        const {changeTitle} = this.props
        changeTitle("Sign-in")
    }

    onSubmit = (values) => {
        const {login, onSignIn} = this.props
        if(typeof onSignIn === 'function') {
            login(values, onSignIn)
        } else {
            login(values)
        }
    }

    render() {
        const { handleSubmit, invalid, password } = this.props
        const { onSubmit } = this
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                        <form onSubmit={handleSubmit(values => onSubmit(values))}>
                            <Card>
                                <CardText>
                                    <Field name="username" label="Username" icon="account_box" validators={{required: true}} />
                                    <Field name="password" label="Password" type="password" icon="vpn_key" validators={{required: true, password: true}} />
                                </CardText>
                                <CardActions>
                                    <Button disabled={invalid} label="Sign-in" type="submit" raised primary />
                                    <Button label="Register" flat href="#/register" />
                                </CardActions>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}