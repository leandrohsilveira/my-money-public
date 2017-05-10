import React, {Component} from 'react'

import {white} from 'material-ui/styles/colors'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'


import BillingCycleListTab from './billing-cycle-list-tab.component'
import BillingCycleCreateTab from './billing-cycle-create-tab.component'

const ICON_TAB_LIST = <FontIcon className="mi mi-format-list-bulleted" color={white} />
const ICON_TAB_CREATE = <FontIcon className="mi mi-add" color={white} />
const ICON_TAB_EDIT = <FontIcon className="mi mi-edit" color={white} />
const ICON_TAB_DELETE = <FontIcon className="mi mi-delete" color={white} />

export default class BillingCycleTabs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tab: 'List',
            tabsToShow: []
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(tab) {
        this.setState({tab})
    }

    render() {

        const tabs = []
        const tabList = (
            <Tab key="List" icon={ICON_TAB_LIST} label="List" value="List">
                <BillingCycleListTab billingCycles={this.props.billingCycles}
                                        allBillingCyclesLoaded={this.props.allBillingCyclesLoaded}
                                        onNextBillingCyclesPage={this.props.onNextBillingCyclesPage} />
            </Tab>
        )
        const tabCreate = (
            <Tab key="Create" icon={ICON_TAB_CREATE} label="Create" value="Create" onActive={this.props.onCreateTabSelect}>
                <BillingCycleCreateTab onCreate={this.props.onCreate} />
            </Tab>
        )
        const tabEdit = (
            <Tab key="Edit" icon={ICON_TAB_EDIT} label="Edit" value="Edit" onActive={this.props.onEditTabSelect}>
                Edit tab
            </Tab>
        )
        const tabDelete = (
            <Tab key="Delete" icon={ICON_TAB_DELETE} label="Delete" value="Delete" onActive={this.props.onDeleteTabSelect}>
                Delete tab
            </Tab>
        )

        tabs.push(tabList)
        tabs.push(tabCreate)

        return ( 
            <Tabs value={this.state.tab} onChange={this.handleChange}>
                {tabs}
            </Tabs>
        )
    }

}