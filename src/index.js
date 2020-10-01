import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import MapContainer from './containers/MapContainer'
import initStore from './redux/store'
import * as serviceWorker from './serviceWorker'

const store = initStore()

ReactDOM.render(
  <Provider store={store}>
    <MapContainer />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
