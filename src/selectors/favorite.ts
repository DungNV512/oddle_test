import { createSelector } from '@reduxjs/toolkit'

import { initialState } from 'slices/favorite'
import type { RootState } from 'store/types'

const selectSlice = (state: RootState) => state?.favorite || initialState

export const selectFavoriteUsers = createSelector(
  [selectSlice],
  (state) => state.list,
)

export const selectIsFavorited = (id: string) =>
  createSelector([selectFavoriteUsers], (state) => !!state[id])
