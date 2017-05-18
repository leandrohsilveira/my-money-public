import React from 'react'
import {Route, Switch} from 'react-router-dom'

import BillingCycleFormContainer from './containers/billing-cycle-form.container'
import BillingCycleListContainer from './containers/billing-cycle-list.container'

export default props => (
    <div>
        <Switch>
            <Route exact path="/billing-cycles" component={BillingCycleListContainer} />
            <Route path="/billing-cycles/new" render={props => <BillingCycleFormContainer {...props} type="CREATE" />} />
            <Route path="/billing-cycles/:id/edit" render={props => <BillingCycleFormContainer {...props} type="UPDATE" id={props.match.params.id} />} />
            <Route path="/billing-cycles/:id/delete" render={props => <BillingCycleFormContainer {...props} type="DELETE" id={props.match.params.id} />} />
        </Switch>
    </div>
)