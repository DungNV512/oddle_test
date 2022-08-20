import { AnyAction, Reducer } from '@reduxjs/toolkit'
import { SagaInjectionModes } from 'redux-injectors'
import { Saga } from 'redux-saga'
import { DummyState } from 'slices/dummy'
import { FavoriteState } from 'slices/favorite'
import { SearchState } from 'slices/search'

export interface RootState {
  dummy?: DummyState
  searchUsers?: SearchState
  favorite?: FavoriteState
  // Insert new reducer key
}

type RequiredRootState = Required<RootState>

export type RootStateKeyType = keyof RootState

export type InjectedReducersType = {
  [P in RootStateKeyType]?: Reducer<RequiredRootState[P], AnyAction>
}

export interface InjectReducerParams<Key extends RootStateKeyType> {
  key: Key
  reducer: Reducer<RequiredRootState[Key], AnyAction>
}

export interface InjectSagaParams {
  key: RootStateKeyType | string
  saga: Saga
  mode?: SagaInjectionModes
}
