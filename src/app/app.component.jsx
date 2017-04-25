import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500} from 'material-ui/styles/colors';

import Header from '../common/template/header'
import Sidebar from '../common/template/sidebar'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "Home",
            sideBarOpen: false
        }
        injectTapEventPlugin();

        this.handleSidebarOpen = this.handleSidebarOpen.bind(this)
        this.handleSidebarChange = this.handleSidebarChange.bind(this)
    }

    handleSidebarOpen() {
        this.setState({...this.state, sideBarOpen: true})
    }

    handleSidebarChange(open = false) {
        this.setState({...this.state, sideBarOpen: open})
    }

    render() {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: blue500
            }
        });
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header title={this.state.title} onSidebarOpen={this.handleSidebarOpen}></Header>
                    <Sidebar open={this.state.sideBarOpen} onChange={this.handleSidebarChange} docked={false}></Sidebar>
                </div>
            </MuiThemeProvider>
        )
    }

}