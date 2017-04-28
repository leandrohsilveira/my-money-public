import { combineReducers } from 'redux'

import layoutReducer from './layout/layout.reducer'
import dashboardReducer from './dashboard/dashboard.reducer'
import billingCycleReducer from './billing-cycle/billing-cycle.reducer'

export default combineReducers({
    layout: layoutReducer,
    dashboard: dashboardReducer,
    billingCycle: billingCycleReducer
})