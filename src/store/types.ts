import { AnyAction, Reducer } from '@reduxjs/toolkit'
import { DummyState } from 'modules/home/slices/dummy'
import { SagaInjectionModes } from 'redux-injectors'
import { Saga } from 'redux-saga'

export interface RootState {
  dummy?: DummyState
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
