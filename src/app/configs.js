import {toastr} from 'react-redux-toastr'

export const api = path => `/api/${path}`

export const openApi = path => `/oapi/${path}`

export const handleResponseError = (e) => {
    console.log(e.response || e)
    const title = e.response.data.message
    switch(e.response.status) {
        case 400:
            Object.keys(e.response.data.errors).forEach(key => toastr.error(title, e.response.data.errors[key].message.replace('Path', 'Field')))
            break
        default:
            Object.keys(e.response.data.errors).forEach(key => toastr.error(title, e.response.data.errors[key].message))
            break
    }
}