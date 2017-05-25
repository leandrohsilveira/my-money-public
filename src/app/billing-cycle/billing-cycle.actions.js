import axios from 'axios'

import {toastr} from 'react-redux-toastr'
import {reset as resetReduxForm, initialize as initializeReduxForm} from 'redux-form'

import {api, handleResponseError} from '../configs'

export const BILLING_CYCLE = {
    CREATED: 'BILLING_CYCLE.CREATED',
    UPDATED: 'BILLING_CYCLE.UPDATED',
    DELETED: 'BILLING_CYCLE.DELETED',
    RETRIEVED: 'BILLING_CYCLE.RETRIEVED',
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

export const createBillingCycle = (values, callback) => {
    return dispatch => {
        axios.post(api('billing-cycles'), values)
                .then(callback)
                .then(resp => dispatch({
                    type: BILLING_CYCLE.CREATED
                }))
                .then(resp => {
                    toastr.success('Success', 'Billing cycle successfully registered')
                    return dispatch(doBillingCycleFetch(dispatch, true));
                })
                .catch(e => handleResponseError(e))

    }
}

export const updateBillingCycle = (values, callback) => {
    return dispatch => {
        axios.put(api(`billing-cycles/${values._id}`), values)
                .then(callback)
                .then(resp => dispatch({
                    type: BILLING_CYCLE.UPDATED
                }))
                .then(resp => {
                    toastr.success('Success', 'Billing cycle successfully updated')
                    return dispatch(doBillingCycleFetch(dispatch, true));
                })
                .catch(e => handleResponseError(e))

    }
}


export const deleteBillingCycle = (values, callback) => {

    return dispatch => {
        axios.delete(api(`billing-cycles/${values._id}`))
                .then(callback)
                .then(resp => dispatch({
                    type: BILLING_CYCLE.DELETED
                }))
                .then(resp => {
                    toastr.success('Success', 'Billing cycle successfully deleted')
                    return dispatch(doBillingCycleFetch(dispatch, true));
                })
                .catch(e => handleResponseError(e))

    }
}

export const fetchBillingCycles = (page, limit) => {
    return dispatch => {
        return doBillingCycleFetch(dispatch, false, page, limit)
    }
}

export const retrieveBillingCycle = (id) => {
    return dispatch => {
        return axios.get(api(`billing-cycles/${id}`))
                    .then(resp => dispatch([
                        {type: BILLING_CYCLE.RETRIEVED},
                        initializeForm(resp.data)
                    ]));
    }
}

export const initializeForm = (values = BILLING_CYCLE_FORM.INITIAL_VALUE) => initializeReduxForm(BILLING_CYCLE_FORM.NAME, values)

export const resetForm = () => resetReduxForm(BILLING_CYCLE_FORM.NAME)

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