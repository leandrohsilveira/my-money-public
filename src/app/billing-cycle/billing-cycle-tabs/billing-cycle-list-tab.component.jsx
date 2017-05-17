import React, {Component} from 'react'

import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'

import BillingCycleList from '../billing-cycle-list.component'

const loadMoreIcon = <i className="mi mi-expand-more" />

export default class BillingCycleListTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: []
        }

        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(selected) {
        this.setState({selected: selected})
    }

    render() {
        return (
            <div className="content">
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-8 col-md-6">
                        <Card>
                            <CardText className="start-xs">
                                <BillingCycleList billingCycles={this.props.billingCycles} selected={this.state.selected} onSelect={this.handleSelect} />
                            </CardText>
                            <CardActions>
                                <Button raised flat
                                        disabled={this.props.allBillingCyclesLoaded} 
                                        onClick={this.props.onNextBillingCyclesPage}
                                        primary={true} 
                                        icon={loadMoreIcon} 
                                        label="Load more" />
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}