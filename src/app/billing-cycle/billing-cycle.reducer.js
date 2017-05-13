import {BILLING_CYCLE} from './billing-cycle.actions'

const INITIAL_STATE = {
    tab: '',
    tabsVisibility: [],
    billingCycles: [],
    page: 0,
    allBillingCyclesLoaded: false,
    errorResp: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case BILLING_CYCLE.TAB_CHANGED:
            return {
                ...state,
                tab: action.payload
            }
        case BILLING_CYCLE.TABS_VISIBILITY_CHANGE:
            return {
                ...state,
                tabsVisibility: action.payload
            }
        case BILLING_CYCLE.FETCHED:
            const newBillingCycles = state.billingCycles.slice()
            Array.prototype.forEach.call(action.payload.billingCycles, billingCycle => newBillingCycles.push(billingCycle))
            return {
                ...state, 
                page: action.payload.page, 
                billingCycles: newBillingCycles, 
                allBillingCyclesLoaded: action.payload.allBillingCyclesLoaded, 
                errorResp: null
            }
        case BILLING_CYCLE.FETCH_FAILED:
            return {...state, errorResp: action.payload}
        default:
            return state
    }
}