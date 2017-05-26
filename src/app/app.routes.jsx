import React from 'react';

import {Route, Redirect} from 'react-router'

import AppLayout from './layout/layout.container'
import Dashboard from './dashboard/dashboard.container'
// import BillingCycleTabs from './billing-cycle/billing-cycle-tabs/billing-cycle-tabs.container'
import BillingCycleRoutes from './billing-cycle/billing-cycle.routes'
import AccessControl from './access-control'
import UserRoutes from './user/user.routes'

export default props => (
    <div>
        <Route path="/">
            <AppLayout>
                <Route path="/dashboard" render={props => (
                    <AccessControl>
                        <Dashboard {...props} />
                    </AccessControl>
                )} />
                <UserRoutes />
                <BillingCycleRoutes />
            </AppLayout>
        </Route>
    </div>
)