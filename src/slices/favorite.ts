import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _unset from 'lodash/unset'

import { useInjectReducer } from 'store/hooks'

export type FavoriteState = {
  list: {
    [key: string]: any
  },
}
export const initialState: FavoriteState = {
  list: {},
}

const slice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    appendFavorite(state, action: PayloadAction<any>) {
      const { user } = action.payload
      const userId = user.id
      state.list[userId] = user
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const userId = action.payload
      _unset(state.list, `${userId}`)
    }
  },
})

export const { actions: favoriteActions } = slice
export const useFavoriteSlice = () => {
  useInjectReducer({
    key: slice.name,
    reducer: slice.reducer,
  })
  return { actions: slice.actions }
}
