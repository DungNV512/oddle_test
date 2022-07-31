import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createInjectorsEnhancer } from 'redux-injectors'
import { createReducer } from './reducers'

const isDev = process.env.NODE_ENV === 'development'
let reduxSagaMonitorOptions = {}
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
const { run: runSaga } = sagaMiddleware

let middlewares = [sagaMiddleware]
if (isDev) {
  const logger = createLogger({
    collapsed: true,
  })
  // @ts-ignore
  middlewares = [...middlewares, logger]
}

const enhancers = [
  createInjectorsEnhancer({
    createReducer,
    runSaga,
  }),
]

export const store = configureStore({
  reducer: createReducer(),
  middleware: [...middlewares],
  devTools: isDev,
  enhancers,
})
