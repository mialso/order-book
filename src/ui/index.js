import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'

export function render(store) {
    return ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app-root'),
    )
}
