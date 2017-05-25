import {toastr} from 'react-redux-toastr'

export const api = path => `/api/${path}`

export const openApi = path => `/oapi/${path}`

export const handleResponseError = (e) => {
    console.error(e.response || e)
    const data = e.response.data
    const title = data.message
    switch(e.response.status) {
        case 400:
            Object.keys(data.errors).forEach(key =>  toastr.error(title, data.errors[key].message.replace('Path', 'Field')))
            break
        case 403:
            if(data && data.errors) {
                Object.keys(data.errors).forEach(key => toastr.error(title, data.errors[key].message))
            } else {
                toastr.error('Access denied', 'Sorry, you lack of permissions to access this content')
            }
            break
        default:
            Object.keys(data.errors).forEach(key => toastr.error(title, data.errors[key].message))
            break
    }
}