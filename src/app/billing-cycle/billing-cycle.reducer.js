import {BILLING_CYCLE} from './billing-cycle.actions'

const INITIAL_STATE = {
    billingCycles: [],
    page: 0,
    allBillingCyclesLoaded: false,
    errorResp: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case BILLING_CYCLE.BILLING_CYCLES_FETCHED:
            const newBillingCycles = state.billingCycles.slice()
            Array.prototype.forEach.call(action.payload.billingCycles, billingCycle => newBillingCycles.push(billingCycle))
            return {...state, page: action.payload.page, billingCycles: newBillingCycles, allBillingCyclesLoaded: action.payload.allBillingCyclesLoaded}
        case BILLING_CYCLE.BILLING_CYCLES_FETCH_FAILED:
            return {...state, errorResp: action.payload}
        default:
            return state
    }
}