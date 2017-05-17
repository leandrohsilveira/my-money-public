import React from 'react'

import MenuItem from 'react-toolbox/lib/menu/MenuItem'

export default props => (
    <a className="nav-menu-item" href={'#' + props.href} onClick={props.onClick}>
        <MenuItem icon={<i className={props.iconClass}></i>} caption={props.value} />
    </a>
)