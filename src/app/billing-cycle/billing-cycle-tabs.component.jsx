import React, {Component} from 'react'

import {white} from 'material-ui/styles/colors'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'

import BillingCycleList from './billing-cycle-list.component'

export default class BillingCycleTabs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tab: 'List'
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(tab) {
        this.setState({tab})
    }

    render() {
        const iconTabList = <FontIcon className="mi mi-format-list-bulleted" color={white} />
        const iconTabCreate = <FontIcon className="mi mi-add" color={white} />
        const iconTabEdit = <FontIcon className="mi mi-edit" color={white} />
        const iconTabDelete = <FontIcon className="mi mi-delete" color={white} />
        const loadMoreIcon = <FontIcon className="mi mi-expand-more" />
        return ( 
            <Tabs value={this.state.tab} onChange={this.handleChange}>
                <Tab icon={iconTabList} label="List" value="List">
                    <div className="content">
                        <BillingCycleList billingCycles={this.props.billingCycles} />
                        <RaisedButton disabled={this.props.allBillingCyclesLoaded} 
                                onTouchTap={this.props.onNextBillingCyclesPage}
                                primary={true} 
                                icon={loadMoreIcon} 
                                label="Load more" />
                    </div>
                </Tab>
                <Tab icon={iconTabCreate} label="Create" value="Create" onActive={this.props.onCreateTabSelect}>
                    Create tab
                </Tab>
                <Tab icon={iconTabEdit} label="Edit" value="Edit" onActive={this.props.onEditTabSelect}>
                    Edit tab
                </Tab>
                <Tab icon={iconTabDelete} label="Delete" value="Delete" onActive={this.props.onDeleteTabSelect}>
                    Delete tab
                </Tab>
            </Tabs>
        )
    }

}