export const LAYOUT = {
    TITLE_CHANGED: 'LAYOUT.TITLE_CHANGED',
    SIDEBAR_TOGGLED: 'LAYOUT.SIDEBAR_TOGGLED'
}

export const changeTitle = (title) => ({
    type: LAYOUT.TITLE_CHANGED,
    payload: title
})

export const onSideBarToggle = () => ({
    type: LAYOUT.SIDEBAR_TOGGLED
})