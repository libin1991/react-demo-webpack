import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { ReduxAsyncConnect } from 'redux-connect'
import { loadableReady } from '@loadable/component'
import createStore from './store'
import routesConfig from './routes'
import api from './api'
import './assets/styles/index.styl'

const initialState = {} // eslint-disable-line
const helpers = { api }
const store = createStore(initialState)
store.dispatch.api.initApi(api)

const renderApp = (routes) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <ReduxAsyncConnect routes={routes} helpers={helpers} />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

loadableReady(() => {
    renderApp(routesConfig)
})

if (module.hot) {
    // react hot reload
    module.hot.accept('./routes', () => {
        const routerConfig = require('./routes').default // eslint-disable-line
        renderApp(routesConfig)
    })
}
