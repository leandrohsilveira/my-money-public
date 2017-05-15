import React, {Component} from 'react'

import {white} from 'material-ui/styles/colors'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {reset as resetForm, initialize as initializeForm} from 'redux-form'

import {changeTitle} from '../../layout/layout.actions'
import {
    changeTab, 
    changeTabsVisibility, 
    fetchBillingCycles, 
    createBillingCycle, 
    updateBillingCycle,
    submitDeleteBillingCycle,
    editBillingCycle,
    deleteBillingCycle
} from '../billing-cycle.actions'

import BillingCycleListTab from './billing-cycle-list-tab.component'
import BillingCycleFormTab from './billing-cycle-form-tab.component'
import ErrorMessage from '../../widgets/error-message.component'

const ICON_TAB_LIST = <FontIcon className="mi mi-format-list-bulleted" color={white} />
const ICON_TAB_CREATE = <FontIcon className="mi mi-add" color={white} />
const ICON_TAB_EDIT = <FontIcon className="mi mi-edit" color={white} />
const ICON_TAB_DELETE = <FontIcon className="mi mi-delete" color={white} />

class BillingCycleTabs extends Component {

    constructor(props) {
        super(props)
        this.handleNextBillingCyclesPage = this.handleNextBillingCyclesPage.bind(this)
        this.handleFormCancel = this.handleFormCancel.bind(this)
        this.handleFormReset = this.handleFormReset.bind(this)
    }

    componentWillMount() {
        this.props.changeTitle("Billing cycles")
        this.props.changeTab('List')
        this.props.changeTabsVisibility(['List', 'Create'])
        this.handleNextBillingCyclesPage()
    }

    handleNextBillingCyclesPage() {
        if(!this.props.allBillingCyclesLoaded) {
            console.debug('handleNextBillingCyclesPage(), this.props.page:', this.props.page + 1)
            this.props.fetchBillingCycles(this.props.page + 1);
        }
    }

    handleFormReset() {
        this.props.resetForm('billingCycleForm')
    }

    handleFormCancel() {
        this.props.changeTab('List')
        this.props.changeTabsVisibility(['List', 'Create'])
        this.props.initializeForm('billingCycleForm', null)
    }

    processResponseError(resp) {
        if(resp == "Error: Network Error") {
            return {message: "The data service is temporarily unavailable", duration: null}
        }
    }

    render() {
        const tabsMap = {
            List: (
                <Tab key="List" icon={ICON_TAB_LIST} label="List" value="List">
                    <BillingCycleListTab billingCycles={this.props.billingCycles}
                                            onEdit={this.props.editBillingCycle}
                                            onDelete={this.props.deleteBillingCycle}
                                            allBillingCyclesLoaded={this.props.allBillingCyclesLoaded}
                                            onNextBillingCyclesPage={this.handleNextBillingCyclesPage} />
                </Tab>
            ),
            Create: (
                <Tab key="Create" icon={ICON_TAB_CREATE} label="Create" value="Create" onActive={this.props.onCreateTabSelect}>
                    <BillingCycleFormTab submitText="Create" onSave={this.props.createBillingCycle} onCancel={this.handleFormCancel} onReset={this.handleFormReset} />
                </Tab>
            ),
            Edit: (
                <Tab key="Edit" icon={ICON_TAB_EDIT} label="Edit" value="Edit" onActive={this.props.onEditTabSelect}>
                    <BillingCycleFormTab submitText="Update" onSave={this.props.updateBillingCycle} onCancel={this.handleFormCancel} onReset={this.handleFormReset} />
                </Tab>
            ),
            Delete: (
                <Tab key="Delete" icon={ICON_TAB_DELETE} label="Delete" value="Delete" onActive={this.props.onDeleteTabSelect}>
                    <BillingCycleFormTab submitText="Delete" readOnly={true} onSave={this.props.submitDeleteBillingCycle} onCancel={this.handleFormCancel} />
                </Tab>
            )
        }

        const tabs = this.props.tabsVisibility.map(tab => tabsMap[tab])

        return ( 
            <div>
                <Tabs value={this.props.tab} onChange={this.props.changeTab}>
                    {tabs}
                </Tabs>
                <ErrorMessage resp={this.props.errorResp} processResponseError={this.processResponseError} action="Retry" onRequestClose={this.handleNextBillingCyclesPage} onAction={this.handleNextBillingCyclesPage}/>
            </div>
        )
    }

}

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

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleTabs);