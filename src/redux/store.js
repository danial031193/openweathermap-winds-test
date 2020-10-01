import { reducer } from './weatherReducer'
import { watcherSaga } from './sagas'
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

/**
 * Initialization redux and sagas
 *
 * @returns {Store<unknown, Action>}
 */
const initStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const reduxDevTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools),
  )

  sagaMiddleware.run(watcherSaga)

  return store
}

export default initStore
