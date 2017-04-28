import axios from 'axios'

import {api} from '../configs'

export const BILLING_CYCLE = {
    BILLING_CYCLES_FETCHED: 'BILLING_CYCLE.BILLING_CYCLES_FETCHED',
    BILLING_CYCLES_FETCH_FAILED: 'BILLING_CYCLE.BILLING_CYCLES_FETCH_FAILED'
}

export const onBillingCycleFetch = (page) => {
    return dispatch => {
        const limit = 10
        const skip = page * limit
        axios.get(api(`billing-cycles?skip=${skip}&limit=${limit}`))    
                .then(resp => {
                    dispatch({
                        type: BILLING_CYCLE.BILLING_CYCLES_FETCHED,
                        payload: {
                            billingCycles: resp.data,
                            page
                        }
                    })
                })
                .catch(resp => {
                    dispatch({
                        type: BILLING_CYCLE.BILLING_CYCLES_FETCH_FAILED,
                        payload: resp
                    })
                })
    }
}