import React from 'react';

import {Route, Redirect} from 'react-router'

import AppLayout from './layout/layout.container'
import Dashboard from './dashboard/dashboard.container'
// import BillingCycleTabs from './billing-cycle/billing-cycle-tabs/billing-cycle-tabs.container'
import BillingCycleRoutes from './billing-cycle/billing-cycle.routes'
import AccessControl from './access-control'
import AuthForm from './auth/auth-form'

export default props => (
    <div>
        <Route path="/">
            <AppLayout>
                <Route path="/login" render={({history}) => (
                    <AuthForm onSignIn={() => history.push('/dashboard')} />
                )} />
                <Route path="/dashboard" render={props => (
                    <AccessControl>
                        <Dashboard {...props} />
                    </AccessControl>
                )} />
                <BillingCycleRoutes />
            </AppLayout>
        </Route>
    </div>
)