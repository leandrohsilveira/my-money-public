import React from 'react';

import {Route, Redirect} from 'react-router'

import Dashboard from './dashboard/dashboard.container'
import BillingCycleTabs from './billing-cycle/billing-cycle-tabs/billing-cycle-tabs.container'

export default props => (
    <div>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/billing-cycles" component={BillingCycleTabs}></Route>
    </div>
)