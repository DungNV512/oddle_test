import TextInput from 'components/TextInput'
import Layout from 'layout'
import React from 'react'
import Empty from './Empty'
import { StyledFavoriteContainer } from './styled'

const FavoriteContainer = () => {
  return (
    <Layout title="Favorite">
      <StyledFavoriteContainer>
        <Empty />
      </StyledFavoriteContainer>
    </Layout>
  )
}

export default FavoriteContainer
