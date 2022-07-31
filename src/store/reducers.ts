import { combineReducers } from '@reduxjs/toolkit'
import { RESET_ALL_STATE } from './constants'

const rootReducer = (injectedReducers: any) => {
  const appReducer: any = combineReducers({
    ...injectedReducers,
  })

  return (state: any, action: any) => {
    if (action.type === RESET_ALL_STATE) {
      return appReducer({ auth: state.auth }, action)
    }
    return appReducer(state, action)
  }
}

const createReducer = (injectedReducers = {}) =>
  Object.keys(injectedReducers).length > 0
    ? rootReducer(injectedReducers)
    : () => {}

export { createReducer }
