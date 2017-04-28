import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem';

export default props => (
    <a className="nav-menu-item" href={'#' + props.href} onClick={props.onClick}>
        <MenuItem leftIcon={<FontIcon className={props.iconClass}></FontIcon>} primaryText={props.value}>{props.children}</MenuItem>
    </a>
)