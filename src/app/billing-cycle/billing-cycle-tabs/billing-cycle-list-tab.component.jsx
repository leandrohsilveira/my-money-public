import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'


import BillingCycleList from '../billing-cycle-list.component'

const loadMoreIcon = <FontIcon className="mi mi-expand-more" />

export default props => (
    <div className="content">
        <BillingCycleList billingCycles={props.billingCycles} />
        <RaisedButton disabled={props.allBillingCyclesLoaded} 
                onTouchTap={props.onNextBillingCyclesPage}
                primary={true} 
                icon={loadMoreIcon} 
                label="Load more" />
    </div>
)