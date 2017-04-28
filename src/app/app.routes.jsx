import React from 'react';

import {Route, Redirect} from 'react-router'

import Dashboard from './dashboard/dashboard.container'
import BillingCycle from './billing-cycle/billing-cycle.container'

export default props => (
    <div>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/billing-cycles/new" component={BillingCycle}></Route>
        <Redirect from="*" to="/dashboard"></Redirect>
    </div>
)