import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'

import dummyServices from 'services/dummy'
import { dummyActions } from 'slices/dummy'

function* getDummies() {
  try {
    const response: AxiosResponse = yield call(dummyServices.getDummies)
    const { data } = response
    yield put(dummyActions.getDummiesSuccess({ data }))
  } catch (error) {
    // handle error
  }
}

export function* dummySaga() {
  yield takeLatest(dummyActions.getDummies.type, getDummies)
}
