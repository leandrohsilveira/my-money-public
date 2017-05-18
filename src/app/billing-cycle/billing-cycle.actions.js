import axios from 'axios'

import {toastr} from 'react-redux-toastr'
import {reset as resetReduxForm, initialize as initializeReduxForm} from 'redux-form'

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

export const BILLING_CYCLE_FORM = {
    NAME: 'billingCycleForm',
    INITIAL_VALUE: {
        credits: [{}],
        debts: [{}]
    }
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
                        initializeForm(),
                        doBillingCycleFetch(dispatch, true),
                        changeTab(0)
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
                        initializeForm(),
                        doBillingCycleFetch(dispatch, true),
                        changeTabsVisibility({list: true, create: true}),
                        changeTab(0)
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
                        initializeForm(),
                        doBillingCycleFetch(dispatch, true),
                        changeTabsVisibility({list: true, create: true}),
                        changeTab(0)
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
        changeTabsVisibility({edit: true}),
        changeTab(2),
        initializeForm(billingCycle)
    ]
}

export const deleteBillingCycle = (billingCycle) => {
    return [
        changeTabsVisibility({'delete': true}),
        changeTab(3),
        initializeForm(billingCycle)
    ]
}

export const initializeForm = (values = BILLING_CYCLE_FORM.INITIAL_VALUE) => initializeReduxForm(BILLING_CYCLE_FORM.NAME, values)

export const resetForm = () => resetReduxForm(BILLING_CYCLE_FORM.NAME)

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