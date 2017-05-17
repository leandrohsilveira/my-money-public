import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar/AppBar';

export default props => (
    <AppBar title={props.title} leftIcon={<i className="mi mi-menu mi-24" />} onLeftIconClick={props.onSidebarOpen} />
)