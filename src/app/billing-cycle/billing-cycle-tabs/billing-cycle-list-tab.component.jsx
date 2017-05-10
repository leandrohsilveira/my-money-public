import React from 'react'

import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardText, CardActions} from 'material-ui/Card'

import BillingCycleList from '../billing-cycle-list.component'

const loadMoreIcon = <FontIcon className="mi mi-expand-more" />

export default props => (
    <div className="content">
        <div className="row center-xs">
            <div className="col-xs-6">
                <Card>
                    <CardText className="start-xs">
                        <BillingCycleList billingCycles={props.billingCycles} />
                    </CardText>
                    <CardActions>
                        <RaisedButton disabled={props.allBillingCyclesLoaded} 
                                onTouchTap={props.onNextBillingCyclesPage}
                                primary={true} 
                                icon={loadMoreIcon} 
                                label="Load more" />

                    </CardActions>
                </Card>
            </div>
        </div>
    </div>
)