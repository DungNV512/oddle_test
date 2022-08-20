import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import { call, put, takeLatest } from 'redux-saga/effects'

import searchServices from 'services/search'
import { IGetSearchUsersParams, searchUsersActions } from 'slices/search'

interface ResponseError {
  data?: {
    message?: string
  }
}
function* getSearchUsers(action: PayloadAction<IGetSearchUsersParams>) {
  try {
    const { q, page } = action.payload
    const response: AxiosResponse = yield call(searchServices.searchUsers, {
      q,
      page,
    })
    const { data } = response
    yield put(searchUsersActions.getSearchUsersSuccess({ data }))
  } catch (error) {
    yield put(searchUsersActions.getSearchUsersFailure())
    const err = error as ResponseError
    const message = err?.data?.message || "Something went wrong."
    toast.error(message)
  }
}

export function* searchSaga() {
  yield takeLatest(searchUsersActions.getSearchUsers.type, getSearchUsers)
}
