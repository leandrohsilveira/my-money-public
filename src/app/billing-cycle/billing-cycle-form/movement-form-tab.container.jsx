import React, {Component} from 'react'

import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'

import MovementForm from './movement-form'

export default class MovementFormTab extends Component {

    state = {
        selected: []
    }

    handleSelect = (selected) => {
        this.setState({selected: selected.sort((a, b) => b - a).filter(item => typeof item === 'number')})

    }

    handleAdd = () => {
        this.props.onAdd(this.props.field, {})
    }

    handleDuplicate = () => {
        if(this.state.selected.length) {
            this.state.selected.forEach(index => {
                const movement = this.props.movements[index]
                this.props.onAdd(this.props.field, movement)
            })
        }
    }

    handleDelete = () => {
        if(this.state.selected.length) {
            this.state.selected.forEach(index => {
                this.props.onDelete(this.props.field, index)
            })
            this.setState({selected: []})
        }
    } 


    render() {
        const {
            props: {
                readOnly,
                movements,
                field,
                showStatus
            },
            state: {
                selected, 
            },
            handleSelect, 
            handleDuplicate, 
            handleDelete, 
            handleAdd
        } = this

        return (
            <div className="row padding-top">
                <div className="col-xs-12">
                    <Card>
                        <CardText>
                            <MovementForm readOnly={readOnly} 
                                            selectable={!readOnly}
                                            selected={selected} 
                                            onMovementSelect={handleSelect} 
                                            field={field}
                                            showStatus={showStatus}
                                            movements={movements} />
                        </CardText>
                        {!readOnly && (
                            <CardActions>
                                <Button label="Duplicate" onClick={handleDuplicate} flat disabled={!selected.length} />
                                <Button label="Remove" onClick={handleDelete} flat disabled={!selected.length} />
                            </CardActions>
                        )}
                    </Card>
                    <Button floating accent icon="add" className="floating bottom right" onClick={handleAdd} disabled={readOnly} />
                </div>
            </div>
        )
    }    

}