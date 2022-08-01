import TextInput from 'components/TextInput'
import Layout from 'layout'
import React from 'react'
import Empty from './Empty'
import { StyledSearchContainer } from './styled'

const SearchContainer = () => {
  return (
    <Layout title="Search">
      <StyledSearchContainer>
        <TextInput />
        <Empty />
      </StyledSearchContainer>
    </Layout>
  )
}

export default SearchContainer
