import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Button from 'react-toolbox/lib/button/Button'
import IconButton from 'react-toolbox/lib/button/IconButton'
import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'

import {changeTitle, changeAppBarActions} from '../../layout/layout.actions'
import {fetchBillingCycles} from '../billing-cycle.actions'

import BillingCycleList from './billing-cycle-list'

const mapStateToProps = state => ({
    billingCycles: state.billingCycle.billingCycles, 
    page: state.billingCycle.page,
    allBillingCyclesLoaded: state.billingCycle.allBillingCyclesLoaded
})
const mapDispatchToProps = dispatch => bindActionCreators({
    changeTitle, 
    changeAppBarActions,
    fetchBillingCycles
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class BillingCycleListContainer extends Component {

    state = {
        selected: []
    }

    componentWillMount = () => {
        this.props.changeTitle('Billing cycles list')
        if(!this.props.billingCycles.length) {
            this.handleNextBillingCyclesPage()
        }
    }

    componentWillUnmount = () => {
        if(this.state.selected.length) {
            this.props.changeAppBarActions(null)
        }
    }

    updateAppBarActions = (selected) => {
        const selectedLength = selected.length
        if(selectedLength) {
            const {handleEdit, handleDelete} = this
            this.props.changeAppBarActions((
                <div>
                    <IconButton icon="edit" onClick={handleEdit} inverse />
                    <IconButton icon="delete" onClick={handleDelete} inverse />
                </div>
            ))
        } else {
            this.props.changeAppBarActions(null)
        }
    }

    handleEdit = () => {
        if(this.state.selected.length) {
            const billingCycle = this.props.billingCycles[this.state.selected[0]]
            this.props.history.push(`/billing-cycles/${billingCycle._id}/edit`)
        }
    }

    handleCreate = () => {
        this.props.history.push(`/billing-cycles/new`)
    }

    handleDelete = () => {
        if(this.state.selected.length) {
            const billingCycle = this.props.billingCycles[this.state.selected[0]]
            this.props.history.push(`/billing-cycles/${billingCycle._id}/delete`)
        }
    }

    handleSelect = (selected) => {
        const oldSelectLength = this.state.selected.length
        this.setState({selected: selected})
        if(!(oldSelectLength && selected.length) || (oldSelectLength && !selected.length)) {
            this.updateAppBarActions(selected)
        }
    }

    handleNextBillingCyclesPage = () => {
        if(!this.props.allBillingCyclesLoaded) {
            this.props.fetchBillingCycles(this.props.page + 1);
        }
    }

    render = () => (
        <div className="content">
            <div className="row center-xs">
                <div className="col-xs-12">
                    <Card>
                        <CardText className="start-xs" style={{overflowX:'auto'}}>
                            <BillingCycleList billingCycles={this.props.billingCycles} selected={this.state.selected} onSelect={this.handleSelect} />
                        </CardText>
                        <CardActions>
                            <Button flat
                                    disabled={this.props.allBillingCyclesLoaded} 
                                    onClick={this.handleNextBillingCyclesPage}
                                    primary={true} 
                                    icon="expand_more"
                                    label="Load more" />
                        </CardActions>
                    </Card>
                </div>
                <Button icon='add' className="floating bottom right" floating accent onClick={this.handleCreate} />
            </div>
        </div>
    )

}