import React from 'react'

import BillingCycleForm from '../billing-cycle-form.component'

export default props => (
    <div className="content">
        <div className="row center-xs">
            <div className="col-xs-12 col-sm-10">
                <BillingCycleForm submitText={props.submitText} readOnly={props.readOnly} onSubmit={props.onSave} onCancel={props.onCancel} onReset={props.onReset} />
            </div>
        </div>
    </div>
)