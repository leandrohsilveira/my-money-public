import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import Layout from 'react-toolbox/lib/layout/Layout'
import Panel from 'react-toolbox/lib/layout/Panel'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import IconButton from 'react-toolbox/lib/button/IconButton'

import Sidebar from './sidebar'
import Messages from '../widgets/messages'
import theme from '../../toolbox/theme'

import {onSideBarToggle} from './layout.actions'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'

const mapStateToProps = state => ({title: state.layout.title, sideBarOpen: state.layout.sideBarOpen})
const mapDispatchToProps = dispatch => bindActionCreators({onSideBarToggle: onSideBarToggle}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AppLayout extends Component {
    render = () => (
        <ThemeProvider theme={theme}>
            <Layout>
                <NavDrawer active={this.props.sideBarOpen} onOverlayClick={this.props.onSideBarToggle} permanentAt="lg">
                    <Sidebar onNavigate={this.props.onSideBarToggle} />
                </NavDrawer>
                <Panel>
                    <AppBar className="app-title">
                        <IconButton icon="menu" inverse className="drawer-button" onClick={this.props.onSideBarToggle} />
                        <h3>{this.props.title}</h3>
                    </AppBar>
                    <div>
                        {this.props.children}
                    </div>
                </Panel>
                <Messages />
            </Layout>
        </ThemeProvider>
    )
}