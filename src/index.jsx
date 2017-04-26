import React from 'react'
import ReactDOM from 'react-dom'

import App from './app/app.container'

import './common/template/dependencies'

const render = (
    <App></App>
)

ReactDOM.render(render, document.getElementById('app'))