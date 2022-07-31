import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'store/types'
import { initialState } from 'slices/dummy'

const selectSlice = (state: RootState) => state?.dummy || initialState

export const selectDummies = createSelector(
  [selectSlice],
  (state) => state.list,
)

export const selectLoadingDummy = createSelector(
  [selectSlice],
  (state) => state.loading,
)
