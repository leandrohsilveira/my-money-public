import React from 'react'

import {white} from 'material-ui/styles/colors'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'

import NavMenuItem from '../template/nav-menu-item.component'

export default props => {
    const appIconStyle = {
        marginTop: 5,
        fontSize: 36
    }
    const appIcon = (
        <FontIcon className="mi mi-attach-money mi-light mi-48" color={white} style={appIconStyle}></FontIcon>
    )

    return (
        <Drawer open={props.open} onRequestChange={props.onChange} docked={props.docked}>
            <AppBar title="My Money" iconElementLeft={appIcon}></AppBar>
            <NavMenuItem href="#/dashboard" onClick={props.onChange} iconClass="mi mi-home" value="Dashboard"></NavMenuItem>
            <Divider></Divider>
            <Subheader>Registry</Subheader>
            <NavMenuItem href="#/billing-cycles/new" onClick={props.onChange} iconClass="mi mi-library-add" value="Billing cycles"></NavMenuItem>
        </Drawer>
    )
}