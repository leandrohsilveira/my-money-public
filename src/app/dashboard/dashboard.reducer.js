import {DASHBOARD} from './dashboard.actions'
const INITIAL_STATE = {
    summary: {credit: 0, debt: 0},
    errorResp: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case DASHBOARD.SUMMARY_LOADED:
            return {...state, summary: action.payload, errorResp: null}
        case DASHBOARD.SUMMARY_LOAD_FAILED:
            return {...state, errorResp: action.payload}

        default:
            return state
    }

}