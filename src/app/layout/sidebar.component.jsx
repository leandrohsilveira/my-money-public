import React from 'react'

import Drawer from 'react-toolbox/lib/drawer/Drawer'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider'

import NavMenuItem from '../widgets/nav-menu-item.component'

export default props => {
    const appIconStyle = {
        fontSize: 36
    }
    const appIcon = (
        <i className="mi mi-attach-money mi-light mi-48" style={appIconStyle}></i>
    )

    return (
        <Drawer active={props.open} onOverlayClick={props.onChange}>
            <AppBar title="My Money" leftIcon={appIcon}></AppBar>
            <NavMenuItem href="/dashboard" onClick={props.onChange} iconClass="mi mi-home mi-24" value="Dashboard"></NavMenuItem>
            <MenuDivider />
            <NavMenuItem href="/billing-cycles" onClick={props.onChange} iconClass="mi mi-library-add mi-24" value="Billing cycles"></NavMenuItem>
        </Drawer>
    )
}