import { Box, Grid, Pagination, Typography } from '@mui/material'
import _debounce from 'lodash/debounce'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextInput from 'components/TextInput'
import UserCard from 'components/UserCard'
import { StyledLoading } from 'containers/Loading/styled'
import Layout from 'layout'
import {
  selectSearchUsersLoading,
  selectSearchUsersResults,
} from 'selectors/search'
import { searchUsersActions } from 'slices/search'
import { formateWithCommas } from 'utils/helpers'

import Empty from './Empty'
import { StyledContentWrapper, StyledSearchContainer } from './styled'

const SearchContainer = () => {
  const dispatch = useDispatch()
  const isSearching = useSelector(selectSearchUsersLoading)
  const searchResults = useSelector(selectSearchUsersResults)
  const { total, items } = searchResults
  const [searchKey, setSearchKey] = useState<string>('')
  const [activePage, setActivePage] = useState<number>(1)

  const onChangeSearchKey = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchKey(value)
  }

  const onResetSearchKey = () => {
    setSearchKey('')
  }

  const handleSearch = useCallback(
    _debounce((text: string, page: number) => {
      dispatch(searchUsersActions.getSearchUsers({ q: text, page }))
    }, 800),
    [],
  )

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setActivePage(value)
  }

  useEffect(() => {
    if (searchKey) {
      handleSearch(searchKey, activePage)
    } else {
      dispatch(searchUsersActions.removeSearchResults())
      setActivePage(1)
    }
  }, [searchKey, activePage])

  const renderContent = useCallback(() => {
    if (isSearching)
      return (
        <StyledLoading>
          <div className="spinner"></div>
        </StyledLoading>
      )
    if (!total) return <Empty searchKey={searchKey} />
    const totalPage = Math.floor(total / 15)
    const isEnablePagination = totalPage > 1
    return (
      <>
        {total > 0 ? (
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }} fontSize="14px">
            {`${formateWithCommas(total)} GitHub users found`}
          </Typography>
        ) : null}
        <StyledContentWrapper>
          <Grid
            container
            spacing={2}
            padding="10px 0"
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {items.map((item: any) => (
              <Grid item xs={2} sm={4} md={6} key={item.id}>
                <UserCard info={item} />
              </Grid>
            ))}
          </Grid>
        </StyledContentWrapper>
        {isEnablePagination ? (
          <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPage}
              variant="text"
              shape="rounded"
              color="primary"
              onChange={onChangePage}
            />
          </Box>
        ) : null}
      </>
    )
  }, [searchKey, searchResults])

  return (
    <Layout title="Search">
      <StyledSearchContainer>
        <TextInput
          value={searchKey}
          onChange={onChangeSearchKey}
          onReset={onResetSearchKey}
        />
        {renderContent()}
      </StyledSearchContainer>
    </Layout>
  )
}

export default SearchContainer
