import React from 'react'

import BillingCycleForm from '../billing-cycle-form.component'



export default props => (
    <div className="content">
        <div className="row center-xs">
            <div className="col-xs-6">
                <BillingCycleForm billingCycle={props.billingCycle} onSubmit={props.onCreate} onCancel={props.onCancel} onReset={props.onReset} />
            </div>
        </div>
    </div>
)