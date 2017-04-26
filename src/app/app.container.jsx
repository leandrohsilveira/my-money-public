import React, {Component} from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import appReducer from './app.reducer'
import Layout from '../layout/layout.smart'

export default props => {
    injectTapEventPlugin();

    const store = createStore(appReducer)

    return (
        <Provider store={store}>
            <Layout>
            </Layout>
        </Provider>
    )
}