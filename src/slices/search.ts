import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { searchSaga } from 'sagas/search'
import { useInjectReducer, useInjectSaga } from 'store/hooks'

export type SearchState = {
  data: {
    items: any // because its type base on GitHub API return values
    total: number
  }
  loading: boolean
}

export interface IGetSearchUsersParams {
  q: string,
  page: number
}

interface IGetSearchUsersSuccessParams {
  data: any // because its type base on GitHub API return values
}

export const initialState: SearchState = {
  data: {
    items: [],
    total: 0
  },
  loading: false,
}

const slice = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    getSearchUsers(state: SearchState, action?: PayloadAction<IGetSearchUsersParams>) {
      state.loading = true
    },
    getSearchUsersSuccess(state, action?: PayloadAction<IGetSearchUsersSuccessParams>) {
      state.data.items = action?.payload?.data?.items || []
      state.data.total = action?.payload?.data?.total_count
      state.loading = false
    },
    getSearchUsersFailure(state) {
      state.loading = false
    },
    removeSearchResults(state) {
      state.data = {
        items: [],
        total: 0
      }
      state.loading = false
    },
  },
})

export const { actions: searchUsersActions } = slice
export const useSearchSlice = () => {
  useInjectReducer({
    key: slice.name,
    reducer: slice.reducer,
  })
  useInjectSaga({ key: slice.name, saga: searchSaga })
  return { actions: slice.actions }
}
