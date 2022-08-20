import { Grid } from '@mui/material'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import UserCard from 'components/UserCard'
import Layout from 'layout'
import { selectFavoriteUsers } from 'selectors/favorite'

import Empty from './Empty'
import { StyledContentWrapper, StyledFavoriteContainer } from './styled'

const FavoriteContainer = () => {
  const favoriteUsers = useSelector(selectFavoriteUsers)
  const total = Object.keys(favoriteUsers).length || 0

  const renderContent = useCallback(() => {
    if (!total) {
      return <Empty />
    }
    return (
      <StyledContentWrapper>
        <Grid
          container
          spacing={2}
          padding="10px 0"
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Object.keys(favoriteUsers).map((key: string) => {
            const user = favoriteUsers[key]
            return (
              <Grid item xs={2} sm={4} md={6} key={key}>
                <UserCard info={user} />
              </Grid>
            )
          })}
        </Grid>
      </StyledContentWrapper>
    )
  }, [favoriteUsers, total])

  return (
    <Layout title="Favorite">
      <StyledFavoriteContainer>{renderContent()}</StyledFavoriteContainer>
    </Layout>
  )
}

export default FavoriteContainer
