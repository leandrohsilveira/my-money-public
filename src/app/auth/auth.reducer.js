
import {AUTH} from './auth.actions'

const userKey = '_mymoney_user'
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    validToken: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AUTH.TOKEN_VALIDATED:
            if(action.payload) {
                return {...state, validToken: true}
            } else {
                localStorage.removeItem(userKey)
                return { ...state, validToken: false, user: null}
            }
        case AUTH.CURRENT_USER_FETCHED:
            localStorage.setItem(userKey, JSON.stringify(action.payload))
            return {...state, user: action.payload, validToken: true}
        default:
            return state
    }
}