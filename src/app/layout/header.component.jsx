import React from 'react'
import AppBar from 'material-ui/AppBar';

export default props => (
    <AppBar title={props.title} iconClassNameLeft="mi mi-menu" onLeftIconButtonTouchTap={props.onSidebarOpen} />
)