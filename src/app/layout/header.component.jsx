import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar/AppBar';

export default props => (
    <AppBar title={props.title} leftIcon="menu" onLeftIconClick={props.onSidebarOpen} />
)