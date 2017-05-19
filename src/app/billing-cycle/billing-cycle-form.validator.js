
const INTEGER_REGEX = /^-?\d+?$/
const FLOAT_REGEX = /^-?\d+(\.\d+)?$/

export default values => {

    const errors = {}

    if(!values.name) {
        errors.name = 'The name field is required'
    }

    if(!values.month) {
        errors.month = 'The month field is required'
    } else if(!(INTEGER_REGEX.test(values.month))) {
        errors.month = 'The month field must be an integer number'
    } else if(+values.month > 12) {
        errors.month = 'The month field must be lesser or equal 12'
    } else if(+values.month < 1) {
        errors.month = 'The month field must be greater or equal 1'
    }

    if(!values.year) {
        errors.year = 'The year field is required'
    } else if(!(INTEGER_REGEX.test(values.year))) {
        errors.year = 'The year field must be an integer number'
    } else if(+values.year < 1970) {
        errors.year = 'The year field must be greater or equal 1970'
    }

    if(values.credits && values.credits.length) {
        const creditsErrors = values.credits.map(credit => {
            const _errors = {}
            if(!credit.name) {
                _errors.name = 'The name field is required'
            }
            if(!credit.value) {
                _errors.value = 'The value field is required'
            } else if(!(FLOAT_REGEX.test(credit.value))) {
                _errors.value = 'The value field must be a number'
            } else if(credit.value < 0) {
                _errors.value = 'The value field must be greater or equal zero'
            }
            return _errors
        }).filter(_errors => _errors.name || _errors.value)
        if(creditsErrors.length) {
            errors.credits = creditsErrors
        }
    }

    if(values.debts && values.debts.length) {
        const debtsErrors = values.debts.map(debt => {
            const _errors = {}
            if(!debt.name) {
                _errors.name = 'The name field is required'
            }
            if(!debt.value) {
                _errors.value = 'The value field is required'
            } else if(!(FLOAT_REGEX.test(debt.value))) {
                _errors.value = 'The value field must be a number'
            } else if(debt.value < 0) {
                _errors.value = 'The value field must be greater or equal zero'
            }

            if(!debt.status) {
                _errors.status = 'The status field is required'
            }

            return _errors
        }).filter(_errors => _errors.name || _errors.value || _errors.status)
        if(debtsErrors.length) {
            errors.debts = debtsErrors
        }
    }
    
    return errors;

}