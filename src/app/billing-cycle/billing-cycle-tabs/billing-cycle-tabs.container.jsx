import React, {Component} from 'react'

import Tabs from 'react-toolbox/lib/tabs/Tabs'
import Tab from 'react-toolbox/lib/tabs/Tab'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {changeTitle} from '../../layout/layout.actions'
import {
    changeTab, 
    changeTabsVisibility, 
    fetchBillingCycles, 
    createBillingCycle, 
    updateBillingCycle,
    submitDeleteBillingCycle,
    editBillingCycle,
    deleteBillingCycle,
    initializeForm,
    resetForm
} from '../billing-cycle.actions'

import BillingCycleListTab from './billing-cycle-list-tab.component'
import BillingCycleFormTab from './billing-cycle-form-tab.component'

const ICON_TAB_LIST = <i className="mi mi-format-list-bulleted" />
const ICON_TAB_CREATE = <i className="mi mi-add" />
const ICON_TAB_EDIT = <i className="mi mi-edit" />
const ICON_TAB_DELETE = <i className="mi mi-delete" />

const mapStateToProps = state => ({
    tab: state.billingCycle.tab,
    billingCycles: state.billingCycle.billingCycles, 
    page: state.billingCycle.page,
    allBillingCyclesLoaded: state.billingCycle.allBillingCyclesLoaded,
    errorResp: state.billingCycle.errorResp,
    tabsVisibility: state.billingCycle.tabsVisibility
})
const mapDispatchToProps = dispatch => bindActionCreators({
    changeTitle, 
    changeTab, 
    changeTabsVisibility, 
    fetchBillingCycles, 
    createBillingCycle,
    updateBillingCycle,
    submitDeleteBillingCycle,
    editBillingCycle,
    deleteBillingCycle,
    resetForm,
    initializeForm
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BillingCycleTabs extends Component {

    componentWillMount = () => {
        this.props.changeTitle("Billing cycles")
        this.props.changeTab(0)
        this.props.changeTabsVisibility({list: true, create: true})
        this.props.initializeForm()
        this.handleNextBillingCyclesPage()
    }

    handleNextBillingCyclesPage = () => {
        if(!this.props.allBillingCyclesLoaded) {
            console.debug('handleNextBillingCyclesPage(), this.props.page:', this.props.page + 1)
            this.props.fetchBillingCycles(this.props.page + 1);
        }
    }

    handleFormReset = () => {
        this.props.resetForm()
    }

    handleFormCancel = () => {
        this.props.changeTab(0)
        this.props.changeTabsVisibility({list: true, create: true})
        this.props.initializeForm()
    }

    processResponseError = (resp) => {
        if(resp == "Error: Network Error") {
            return {message: "The data service is temporarily unavailable", duration: null}
        }
    }

    render() {
        return ( 
            <Tabs index={this.props.tab || 0} onChange={this.props.changeTab} fixed>
                <Tab icon={ICON_TAB_LIST} label="List" hidden={!this.props.tabsVisibility.list}>
                    <BillingCycleListTab billingCycles={this.props.billingCycles}
                                            onEdit={this.props.editBillingCycle}
                                            onDelete={this.props.deleteBillingCycle}
                                            allBillingCyclesLoaded={this.props.allBillingCyclesLoaded}
                                            onNextBillingCyclesPage={this.handleNextBillingCyclesPage} />
                </Tab>
                <Tab icon={ICON_TAB_CREATE} label="Create" onActive={this.props.onCreateTabSelect} hidden={!this.props.tabsVisibility.create}>
                    <BillingCycleFormTab submitText="Create" onSave={this.props.createBillingCycle} onCancel={this.handleFormCancel} onReset={this.handleFormReset} />
                </Tab>
                <Tab icon={ICON_TAB_EDIT} label="Edit" onActive={this.props.onEditTabSelect} hidden={!this.props.tabsVisibility.edit}>
                    <BillingCycleFormTab submitText="Update" onSave={this.props.updateBillingCycle} onCancel={this.handleFormCancel} onReset={this.handleFormReset} />
                </Tab>
                <Tab icon={ICON_TAB_DELETE} label="Delete" onActive={this.props.onDeleteTabSelect} hidden={!this.props.tabsVisibility.delete}>
                    <BillingCycleFormTab submitText="Delete" readOnly={true} onSave={this.props.submitDeleteBillingCycle} onCancel={this.handleFormCancel} />
                </Tab>
            </Tabs>
        )
    }

}