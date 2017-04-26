import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import appReducer from './app.reducer'
import Layout from './layout/layout.container'

export default props => {

    injectTapEventPlugin();
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const store = applyMiddleware(thunk, multi, promise)(createStore)(appReducer, devTools)

    return (
        <Provider store={store}>
            <Layout>
            </Layout>
        </Provider>
    )
}