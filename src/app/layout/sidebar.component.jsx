import React from 'react'

import Drawer from 'react-toolbox/lib/drawer/Drawer'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider'

import NavMenuItem from '../widgets/nav-menu-item.component'

export default props => (
    <div>
        <AppBar className="banner" flat>
            <i className="material-icons">monetization_on</i>
            <span>My Money</span>
        </AppBar>
        <NavMenuItem href="/dashboard" onClick={props.onChange} iconClass="home" value="Dashboard"></NavMenuItem>
        <NavMenuItem href="/billing-cycles" onClick={props.onChange} iconClass="library_add" value="Billing cycles"></NavMenuItem>
        <MenuDivider />
    </div>
)