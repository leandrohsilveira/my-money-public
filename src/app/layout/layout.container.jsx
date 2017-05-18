import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

import Header from './header.component'
import Sidebar from './sidebar.component'
import Messages from '../widgets/messages.component'
import theme from '../../toolbox/theme'

import {onSideBarToggle} from './layout.actions'

const mapStateToProps = state => ({title: state.layout.title, sideBarOpen: state.layout.sideBarOpen})
const mapDispatchToProps = dispatch => bindActionCreators({onSideBarToggle: onSideBarToggle}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Layout extends Component {
    render = () => (
        <ThemeProvider theme={theme}>
            <div>
                <Header title={this.props.title} onSidebarOpen={this.props.onSideBarToggle}></Header>
                <Sidebar open={this.props.sideBarOpen} onChange={this.props.onSideBarToggle} docked={false}></Sidebar>
                {this.props.children}
                <Messages />
            </div>
        </ThemeProvider>
    )
}