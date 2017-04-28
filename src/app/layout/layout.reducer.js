import {LAYOUT} from './layout.actions'

const INITIAL_STATE = {
    title: 'Dashboard',
    sideBarOpen: false
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LAYOUT.TITLE_CHANGED:
            return {...state, title: action.payload}
        case LAYOUT.SIDEBAR_TOGGLED:
            return {...state, sideBarOpen: !state.sideBarOpen}
        default:
            return state
    }

}