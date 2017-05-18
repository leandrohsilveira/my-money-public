import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'

import {changeTitle} from '../../layout/layout.actions'
import {fetchBillingCycles} from '../billing-cycle.actions'

import BillingCycleList from '../billing-cycle-list.component'

const mapStateToProps = state => ({
    billingCycles: state.billingCycle.billingCycles, 
    page: state.billingCycle.page,
    allBillingCyclesLoaded: state.billingCycle.allBillingCyclesLoaded
})
const mapDispatchToProps = dispatch => bindActionCreators({
    changeTitle, 
    fetchBillingCycles
}, dispatch)

const loadMoreIcon = <i className="mi mi-expand-more" />

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
        this.setState({selected: selected})
    }

    handleNextBillingCyclesPage = () => {
        if(!this.props.allBillingCyclesLoaded) {
            this.props.fetchBillingCycles(this.props.page + 1);
        }
    }

    render = () => (
        <div className="content">
            <div className="row center-xs">
                <div className="col-xs-12 col-sm-10">
                    <Card>
                        <CardText className="start-xs">
                            <BillingCycleList billingCycles={this.props.billingCycles} selected={this.state.selected} onSelect={this.handleSelect} />
                        </CardText>
                        <CardActions>
                            <Button raised flat
                                    disabled={this.props.allBillingCyclesLoaded} 
                                    onClick={this.handleNextBillingCyclesPage}
                                    primary={true} 
                                    icon={loadMoreIcon} 
                                    label="Load more" />
                            
                            <Button flat disabled={!this.state.selected.length} label="Edit" onClick={this.handleEdit} />
                            <Button flat disabled={!this.state.selected.length} label="Delete" onClick={this.handleDelete} />
                        </CardActions>
                    </Card>
                </div>
            </div>
            <Button icon='add' floating accent style={{position: 'fixed', right: 50, bottom: 50}} onClick={this.handleCreate} />
        </div>
    )

}