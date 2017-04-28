import {BILLING_CYCLE} from './billing-cycle.actions'

const INITIAL_STATE = {
    billingCycles: [],
    page: 1,
    errorResp: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case BILLING_CYCLE.BILLING_CYCLES_FETCHED:
            return {...state, page: action.payload.page, billingCycles: [...state.billingCycles].push(action.payload.billingCycles)}
        case BILLING_CYCLE.BILLING_CYCLES_FETCH_FAILED:
            return {...state, errorResp: action.payload}
        default:
            return state
    }
}