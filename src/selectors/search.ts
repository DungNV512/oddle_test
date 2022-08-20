import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'store/types'
import { initialState } from 'slices/search'

const selectSlice = (state: RootState) => state?.searchUsers || initialState

export const selectSearchUsersResults = createSelector(
  [selectSlice],
  (state) => state.data,
)

export const selectSearchUsersLoading = createSelector(
  [selectSlice],
  (state) => state.loading,
)
