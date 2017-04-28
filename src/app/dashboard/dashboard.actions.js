import axios from 'axios'
import {api} from '../configs'

export const DASHBOARD = {
    SUMMARY_LOADED: 'DASHBOARD.SUMMARY_LOADED',
    SUMMARY_LOAD_FAILED: 'DASHBOARD.SUMMARY_LOAD_FAILED'
}

export const onSummaryLoad = () => {
    return dispatch => {
        axios.get(api('billing-cycles/summary'))
                .then(resp => {
                    dispatch({type: DASHBOARD.SUMMARY_LOADED, payload: resp.data})
                })
                .catch(resp => {
                    dispatch({type: DASHBOARD.SUMMARY_LOAD_FAILED, payload: resp})
                })
    }
}