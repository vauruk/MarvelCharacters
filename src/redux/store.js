/**
 * @autor Vanderson de Moura Vauruk
 */


import { createStore, applyMiddleware, compose } from 'redux'
//import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createMemoryHistory } from 'history';
import createRootReducer from './reducers'

export const history = createMemoryHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  //routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  //connectRouter(history)(rootReducer),
  createRootReducer(history), // root reducer with router state
  initialState,
  composedEnhancers
)

export default store;