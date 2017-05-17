import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

import Header from './header.component'
import Sidebar from './sidebar.component'
import Messages from '../widgets/messages.component'
import theme from '../../toolbox/theme'

import {onSideBarToggle} from './layout.actions'

const Layout = props => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header title={props.title} onSidebarOpen={props.onSideBarToggle}></Header>
                <Sidebar open={props.sideBarOpen} onChange={props.onSideBarToggle} docked={false}></Sidebar>
                {props.children}
                <Messages />
            </div>
        </ThemeProvider>
    )
}

const mapStateToProps = state => ({title: state.layout.title, sideBarOpen: state.layout.sideBarOpen})
const mapDispatchToProps = dispatch => bindActionCreators({onSideBarToggle: onSideBarToggle}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)