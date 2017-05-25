import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Drawer from 'react-toolbox/lib/drawer/Drawer'
import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider'

import NavMenuItem from '../widgets/nav-menu-item'

import {logout} from '../auth/auth.actions'

const mapStateToProps = state => ({user: state.auth.user})
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class Sidebar extends Component {

    handleLogout = () => {
        const {onNavigate, logout} = this.props
        onNavigate()
        logout()
    }

    render() {
        const {onNavigate, user} = this.props
        const {handleLogout} = this
        return (
            <div>
                <AppBar className="banner" flat>
                    <div className="flex flex-column flex-space-between">
                        <div className="flex flex-row"></div>
                        <div className="flex flex-column flex-center title">
                            <div className="flex flex-row flex-center">
                                <i className="material-icons flex-self-center">monetization_on</i>
                                <span className="flex-self-center">My Money</span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            {user && (
                                <div className="flex flex-row flex-space-between">
                                    <div className="flex flex-row flex-start">
                                        <i className="material-icons flex-self-center">account_circle</i>
                                        <span className="flex-self-center auth">{user.email}</span>
                                        {/*<span className="flex-self-center auth">leandro.hinckel@gmail.com</span>*/}
                                    </div>
                                    <div className="flex flex-row flex-end flex-self-center">
                                        <IconButton icon="power_settings_new" inverse onClick={handleLogout} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </AppBar>
                {user ? [
                    <NavMenuItem key={1} href="/dashboard" onClick={onNavigate} iconClass="home" value="Dashboard"></NavMenuItem>,
                    <NavMenuItem key={2} href="/billing-cycles" onClick={onNavigate} iconClass="library_add" value="Billing cycles"></NavMenuItem>
                ] : (
                    <NavMenuItem href="/login" onClick={onNavigate} iconClass="power_settings_new" value="Sign in"></NavMenuItem>
                )}
                <MenuDivider />
            </div>
        )
    }

}