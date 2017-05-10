import axios from 'axios'

import {api} from '../configs'

export const BILLING_CYCLE = {
    BILLING_CYCLES_FETCHED: 'BILLING_CYCLE.BILLING_CYCLES_FETCHED',
    BILLING_CYCLES_FETCH_FAILED: 'BILLING_CYCLE.BILLING_CYCLES_FETCH_FAILED'
}

export const onBillingCycleCreate = (values) => {

    axios.post(api('billing-cycles'), values)
    return {
        type: 'TEMP'
    }

}

export const onBillingCycleFetch = (page = 1, limit = 10) => {
    return dispatch => {
        const skip = page * limit - limit
        axios.get(api('billing-cycles/count'))
                .then(resp => {
                    console.debug('Billing cycles count response: ', resp)
                    const count = resp.data.count
                    axios.get(api(`billing-cycles?skip=${skip}&limit=${limit}`))    
                        .then(resp => {
                            console.debug(`Billing cycles page ${page} fetch`, resp)
                            dispatch({
                                type: BILLING_CYCLE.BILLING_CYCLES_FETCHED,
                                payload: {
                                    billingCycles: resp.data,
                                    page,
                                    allBillingCyclesLoaded: page >= parseInt(count/limit) 
                                }
                            })
                        })
                }) 
                .catch(resp => {
                    console.error('BILLING_CYCLE.BILLING_CYCLES_FETCH_FAILED: ', resp)
                    dispatch({
                        type: BILLING_CYCLE.BILLING_CYCLES_FETCH_FAILED,
                        payload: resp
                    })
                })
    }
}