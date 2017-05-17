import React from 'react'

import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'

import BillingCycleList from '../billing-cycle-list.component'

const loadMoreIcon = <i className="mi mi-expand-more" />

export default props => (
    <div className="content">
        <div className="row center-xs">
            <div className="col-xs-6">
                <Card>
                    <CardText className="start-xs">
                        <BillingCycleList billingCycles={props.billingCycles} onEdit={props.onEdit} onDelete={props.onDelete} />
                    </CardText>
                    <CardActions>
                        <Button raised flat
                                disabled={props.allBillingCyclesLoaded} 
                                onClick={props.onNextBillingCyclesPage}
                                primary={true} 
                                icon={loadMoreIcon} 
                                label="Load more" />
                    </CardActions>
                </Card>
            </div>
        </div>
    </div>
)