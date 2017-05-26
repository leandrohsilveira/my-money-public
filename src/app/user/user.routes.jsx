import React from 'react'
import {Route} from 'react-router'

import AccessControl from '../access-control'
import AuthForm from './auth-form'
import UserForm from './user-form'

export default props => (
    <div>
        <Route path="/login" render={({history}) => (
            <AccessControl secured={false} onUnsecureAccess={auth => auth && history.push('/dashboard')}>
                <AuthForm onSignIn={() => history.push('/dashboard')} />
            </AccessControl>
        )} />
        <Route path="/register" render={({history}) => (
            <AccessControl secured={false} onUnsecureAccess={auth => auth && history.push('/dashboard')}>
                <UserForm title="Register" onSignUp={() => history.push('/login')} />
            </AccessControl>
        )} />
    </div>
)