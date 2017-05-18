import React from 'react'

import Drawer from 'react-toolbox/lib/drawer/Drawer'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider'

import NavMenuItem from '../widgets/nav-menu-item.component'

export default props => (
    <Drawer active={props.open} onOverlayClick={props.onChange}>
        <AppBar title="My Money" leftIcon="attach_money"></AppBar>
        <NavMenuItem href="/dashboard" onClick={props.onChange} iconClass="home" value="Dashboard"></NavMenuItem>
        <MenuDivider />
        <NavMenuItem href="/billing-cycles" onClick={props.onChange} iconClass="library_add" value="Billing cycles"></NavMenuItem>
    </Drawer>
)