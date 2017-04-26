import { combineReducers } from 'redux'

import layoutReducer from '../layout/layout.reducer'

export default combineReducers({
    layout: layoutReducer
})