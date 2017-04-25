import React from 'react'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default props => (
    <Drawer open={props.open} onRequestChange={props.onChange} docked={props.docked}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
    </Drawer>
)