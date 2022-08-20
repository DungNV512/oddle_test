import { useLazyQuery } from '@apollo/client'
import { Box, Grid, TablePagination, Typography } from '@mui/material'
import _get from 'lodash/get'
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'

import TextInput from 'components/TextInput'
import UserCard from 'components/UserCard'
import { StyledLoading } from 'containers/Loading/styled'
import { SEARCH_USERS } from 'graphql/query'
import Layout from 'layout'
import { formateWithCommas } from 'utils/helpers'

import Empty from './Empty'
import { StyledContentWrapper, StyledSearchContainer } from './styled'

const SearchContainer = () => {
  const [getSearchUsers, { loading, error, data }] = useLazyQuery(SEARCH_USERS)
  const [searchingKey, setSearchingKey] = useState<string>('')
  const [searchKey, setSearchKey] = useState<string>('')
  const [activePage, setActivePage] = useState<number>(0)

  const onChangeSearchKey = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchingKey(value)
    if (value === '') {
      setSearchKey('')
    }
  }

  const onResetSearchKey = () => {
    setSearchKey('')
    setSearchingKey('')
    setActivePage(0)
  }

  const handleSearch = (text: string, cursor?: string) => {
    if (text) {
      getSearchUsers({
        variables: {
          query: text,
          first: 20,
          ...(cursor !== '' && { after: cursor }),
        },
      })
    }
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    const endCursor = _get(data, 'search.pageInfo.endCursor', '')
    const startCursor = _get(data, 'search.pageInfo.startCursor', '')
    handleSearch(searchKey, activePage < newPage ? endCursor : startCursor)
    setActivePage(newPage)
  }

  const onSearch = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      setActivePage(0)
      setSearchKey(searchingKey)
      handleSearch(searchingKey)
    }
  }

  const renderContent = useCallback(() => {
    const total = _get(data, 'search.userCount', 0)
    const isEnablePagination =
      _get(data, 'search.pageInfo.hasNextPage') ||
      _get(data, 'search.pageInfo.hasPreviousPage')
    if (loading)
      return (
        <StyledLoading>
          <div className="spinner"></div>
        </StyledLoading>
      )
    if (!total || searchKey === '')
      return <Empty searchKey={searchKey} error={!!error?.message} />
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
            {data?.search?.edges.map((item: any) => (
              <Grid item xs={2} sm={4} md={6} key={item?.node?.id}>
                <UserCard info={item?.node} />
              </Grid>
            ))}
          </Grid>
        </StyledContentWrapper>
        {isEnablePagination ? (
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <TablePagination
              component="div"
              count={total}
              page={activePage}
              onPageChange={handleChangePage}
              rowsPerPage={20}
              rowsPerPageOptions={[]}
            />
          </Box>
        ) : null}
      </>
    )
  }, [searchKey, data, loading, error])

  return (
    <Layout title="Search">
      <StyledSearchContainer>
        <TextInput
          value={searchingKey}
          onChange={onChangeSearchKey}
          onKeyDown={onSearch}
          onReset={onResetSearchKey}
        />
        {renderContent()}
      </StyledSearchContainer>
    </Layout>
  )
}

export default SearchContainer
