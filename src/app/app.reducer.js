import { combineReducers } from 'redux'

import layoutReducer from './layout/layout.reducer'
import dashboardReducer from './dashboard/dashboard.reducer'

export default combineReducers({
    layout: layoutReducer,
    dashboard: dashboardReducer
})