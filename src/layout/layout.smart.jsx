import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan800} from 'material-ui/styles/colors';

import Header from './header.dumb'
import Sidebar from './sidebar.dumb'

import {onSideBarToggle} from './layout.actions'

const Layout = props => {
    const muiTheme = getMuiTheme({
        palette: {
            primary1Color: cyan800
        }
    });

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <Header title={props.title} onSidebarOpen={props.onSideBarToggle}></Header>
                <Sidebar open={props.sideBarOpen} onChange={props.onSideBarToggle} docked={false}></Sidebar>
                {props.children}
            </div>
        </MuiThemeProvider>
    )
}

const mapStateToProps = state => ({title: state.layout.title, sideBarOpen: state.layout.sideBarOpen})
const mapDispatchToProps = dispatch => bindActionCreators({onSideBarToggle: onSideBarToggle}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)