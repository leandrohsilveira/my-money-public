import React from 'react';

import {Route, Redirect} from 'react-router'

import AppLayout from './layout/layout.container'
import Dashboard from './dashboard/dashboard.container'
// import BillingCycleTabs from './billing-cycle/billing-cycle-tabs/billing-cycle-tabs.container'
import BillingCycleRoutes from './billing-cycle/billing-cycle.routes'

export default props => (
    <div>
        <Route path="/">
            <AppLayout>
                <Route path="/dashboard" component={Dashboard}></Route>
                <BillingCycleRoutes />
            </AppLayout>
        </Route>
    </div>
)