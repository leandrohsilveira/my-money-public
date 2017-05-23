import React, {Component} from 'react'

import {Field as ReduxField} from 'redux-form'

import Input from './input'
import Select from './select'

const INTEGER_REGEX = /^-?\d+?$/
const FLOAT_REGEX = /^-?\d+(\.\d+)?$/

export default class Field extends Component {

    getValidators = () => {
        const validatorFunctions = []
        const {validators: {required, number}, label} = this.props
        if(required) {
            validatorFunctions.push((value) => !value ? `The field "${label}" is required` : undefined)
        }
        if(number) {
            const {min, max, int = false} = number
            if(int) {
                validatorFunctions.push((value) => !INTEGER_REGEX.test(value) ? `The field "${label}" must be an integer number` : undefined)
            } else {
                validatorFunctions.push((value) => !FLOAT_REGEX.test(value) ? `The field "${label}" must be a number` : undefined)
            }

            if(min !== undefined) {
                validatorFunctions.push((value) => +min > +value ? `The field "${label}" must be greater than ${min}` : undefined)
            }
            if(max !== undefined) {
                validatorFunctions.push((value) => +value > +max ? `The field "${label}" must be lesser than ${max}` : undefined)
            }
        }
        return validatorFunctions
    }

    render() {
        const {name, label, disabled, validators, options, type = 'text'} = this.props
        return (
            <ReduxField name={name} 
                        validate={this.getValidators()} 
                        component={options ? Select : Input} 
                        label={label} 
                        type={type} 
                        options={options}
                        disabled={disabled} 
                        required={validators && validators.required} />
        )
    }

}