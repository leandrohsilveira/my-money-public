import axios from 'axios'

import {toastr} from 'react-redux-toastr'
import {reset as resetForm, initialize} from 'redux-form'

import {api} from '../configs'

export const BILLING_CYCLE = {
    TAB_CHANGED: 'BILLING_CYCLE.TAB_CHANGED',
    TABS_VISIBILITY_CHANGE: 'BILLING_CYCLE.TABS_VISIBILITY_CHANGE',
    CREATED: 'BILLING_CYCLE.CREATED',
    UPDATED: 'BILLING_CYCLE.UPDATED',
    DELETED: 'BILLING_CYCLE.DELETED',
    FETCHED: 'BILLING_CYCLE.FETCHED',
    FETCH_FAILED: 'BILLING_CYCLE.FETCH_FAILED'
}

export const changeTab = (tab) => ({
    type: BILLING_CYCLE.TAB_CHANGED,
    payload: tab
})

export const changeTabsVisibility = (tabs) => ({
    type: BILLING_CYCLE.TABS_VISIBILITY_CHANGE,
    payload: tabs
})

export const createBillingCycle = (values) => {

    return dispatch => {
        axios.post(api('billing-cycles'), values)
                .then(resp => dispatch({
                    type: BILLING_CYCLE.CREATED
                }))
                .then(resp => {
                    toastr.success('Success', 'Billing cycle successfully registered')
                    return dispatch([
                        resetForm('billingCycleForm'),
                        doBillingCycleFetch(dispatch, true),
                        changeTab('List')
                    ]);
                })
                .catch(e => handleResponseError(e))

    }
}

export const updateBillingCycle = (values) => {

    return dispatch => {
        axios.put(api(`billing-cycles/${values._id}`), values)
                .then(resp => dispatch({
                    type: BILLING_CYCLE.UPDATED
                }))
                .then(resp => {
                    toastr.success('Success', 'Billing cycle successfully updated')
                    return dispatch([
                        initialize('billingCycleForm', null),
                        doBillingCycleFetch(dispatch, true),
                        changeTabsVisibility(['List', 'Create']),
                        changeTab('List')
                    ]);
                })
                .catch(e => handleResponseError(e))

    }
}


export const submitDeleteBillingCycle = (values) => {

    return dispatch => {
        axios.delete(api(`billing-cycles/${values._id}`))
                .then(resp => dispatch({
                    type: BILLING_CYCLE.DELETED
                }))
                .then(resp => {
                    toastr.success('Success', 'Billing cycle successfully deleted')
                    return dispatch([
                        initialize('billingCycleForm', null),
                        doBillingCycleFetch(dispatch, true),
                        changeTabsVisibility(['List', 'Create']),
                        changeTab('List')
                    ]);
                })
                .catch(e => handleResponseError(e))

    }
}

export const fetchBillingCycles = (page, limit) => {
    return dispatch => {
        return doBillingCycleFetch(dispatch, false, page, limit)
    }
}

export const editBillingCycle = (billingCycle) => {
    return [
        changeTabsVisibility(['Edit']),
        changeTab('Edit'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export const deleteBillingCycle = (billingCycle) => {
    return [
        changeTabsVisibility(['Delete']),
        changeTab('Delete'),
        initialize('billingCycleForm', billingCycle)
    ]
}

function handleResponseError(e) {
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
}

function doBillingCycleFetch(dispatch, reset = false, page = 1, limit = 10) {
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
                                reset,
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