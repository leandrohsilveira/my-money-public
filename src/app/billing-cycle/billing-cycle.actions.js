import axios from 'axios'

import {toastr} from 'react-redux-toastr'
import {reset as resetForm} from 'redux-form'

import {api} from '../configs'

export const BILLING_CYCLE = {
    TAB_CHANGED: 'BILLING_CYCLE.TAB_CHANGED',
    TABS_VISIBILITY_CHANGE: 'BILLING_CYCLE.TABS_VISIBILITY_CHANGE',
    CREATED: 'BILLING_CYCLE.CREATED',
    FETCHED: 'BILLING_CYCLE.FETCHED',
    FETCH_FAILED: 'BILLING_CYCLE.FETCH_FAILED'
}

export const onTabChange = (tab) => ({
    type: BILLING_CYCLE.TAB_CHANGED,
    payload: tab
})

export const onTabsVisibilityChange = (tabs) => ({
    type: BILLING_CYCLE.TABS_VISIBILITY_CHANGE,
    payload: tabs
})

export const onBillingCycleCreate = (values) => {

    return dispatch => {
        axios.post(api('billing-cycles'), values)
                .then(resp => dispatch({
                    type: BILLING_CYCLE.CREATED
                }))
                .then(resp => {
                    toastr.success('Sucesso', 'Operação realizada com sucesso')
                    return dispatch([
                        resetForm('billingCycleForm'),
                        doBillingCycleFetch(dispatch),
                        onTabChange('List')
                    ]);
                })
                .catch(e => {
                    const title = e.response.data.message
                    console.log(e.response)
                    switch(e.response.status) {
                        case 400:
                            Object.keys(e.response.data.errors).forEach(key => toastr.error(title, e.response.data.errors[key].message.replace('Path', 'Field')))
                            break
                        default:
                            Object.keys(e.response.data.errors).forEach(key => toastr.error(title, e.response.data.errors[key].message))
                            break
                    }
                })

    }
}

export const onBillingCycleFetch = (page, limit) => {
    return dispatch => {
        return doBillingCycleFetch(dispatch, page, limit)
    }
}

function doBillingCycleFetch(dispatch, page = 1, limit = 10) {
    const skip = page * limit - limit
    axios.get(api('billing-cycles/count'))
            .then(resp => {
                console.debug('Billing cycles count response: ', resp)
                const count = resp.data.count
                axios.get(api(`billing-cycles?skip=${skip}&limit=${limit}`))    
                    .then(resp => {
                        console.debug(`Billing cycles page ${page} fetch`, resp)
                        dispatch({
                            type: BILLING_CYCLE.FETCHED,
                            payload: {
                                billingCycles: resp.data,
                                page,
                                allBillingCyclesLoaded: page >= 1 + parseInt(count/limit)
                            }
                        })
                    })
            }) 
            .catch(resp => {
                console.error('BILLING_CYCLE.FETCH_FAILED: ', resp)
                dispatch({
                    type: BILLING_CYCLE.FETCH_FAILED,
                    payload: resp
                })
            })
}