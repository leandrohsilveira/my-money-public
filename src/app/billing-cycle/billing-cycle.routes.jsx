import React from 'react'
import {Route, Switch} from 'react-router-dom'

import BillingCycleFormContainer from './billing-cycle-form/billing-cycle-form.container'
import BillingCycleListContainer from './billing-cycle-list/billing-cycle-list.container'
import AccessControl from '../access-control'

export default props => (
    <div>
        <Switch>
            <Route exact path="/billing-cycles" render={props => (
                <AccessControl>
                    <BillingCycleListContainer {...props} />
                </AccessControl>
            )} />
            <Route path="/billing-cycles/new" render={props => (
                <AccessControl>
                    <BillingCycleFormContainer {...props} type="CREATE" />
                </AccessControl>
            )} />
            <Route path="/billing-cycles/:id/edit" render={props => (
                <AccessControl>
                    <BillingCycleFormContainer {...props} type="UPDATE" id={props.match.params.id} />
                </AccessControl>
            )} />
            <Route path="/billing-cycles/:id/delete" render={props => (
                <AccessControl>
                    <BillingCycleFormContainer {...props} type="DELETE" id={props.match.params.id} />
                </AccessControl>
            )} />
        </Switch>
    </div>
)