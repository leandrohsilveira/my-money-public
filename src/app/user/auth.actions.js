import {toastr} from 'react-redux-toastr'
import axios from 'axios'
import {openApi, handleResponseError} from '../configs'


export const AUTH = {
    TOKEN_VALIDATED: 'AUTH.TOKEN_VALIDATED',
    CURRENT_USER_FETCHED: 'AUTH.CURRENT_USER_FETCHED',
    USER_SIGNED_UP: 'AUTH.USER_SIGNED_UP'
}

export const AUTH_FORM = {
    NAME: 'authForm'
}

export function login(values, callback) {
    return dispatch => {
        return axios.post(openApi('login'), values)
            .then(resp => {
                return dispatch([
                    {type: AUTH.CURRENT_USER_FETCHED, payload: resp.data}
                ])
            })
            .then(callback)
            .catch(e => handleResponseError(e))
    }
}

export function signUp(values, callback) {
    return dispatch => {
        return axios.post(openApi('signup'), values)
            .then(resp => {
                toastr.success('Success', 'Sign-up successful')
                return dispatch([
                    {type: AUTH.USER_SIGNED_UP, payload: resp.data}
                ])
            })
            .then(callback)
            .catch(e => handleResponseError(e))
    }
}

export function logout() {
    return {type: AUTH.TOKEN_VALIDATED, payload: false}
}

export function validateToken(token) {
    return dispatch => {
        if(token) {
            axios.post(openApi('/token'), {token})
                .then(resp => {
                    dispatch({type: AUTH.TOKEN_VALIDATED, payload: resp.data.valid})
                })
                .catch(e => dispatch(logout()))
        } else {
            dispatch(logout())
        }
    }
}