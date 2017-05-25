import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import layoutReducer from './layout/layout.reducer'
import dashboardReducer from './dashboard/dashboard.reducer'
import billingCycleReducer from './billing-cycle/billing-cycle.reducer'
import authReducer from './auth/auth.reducer'

export default combineReducers({
    layout: layoutReducer,
    dashboard: dashboardReducer,
    billingCycle: billingCycleReducer,
    auth: authReducer,
    form: formReducer,
    toastr: toastrReducer
})