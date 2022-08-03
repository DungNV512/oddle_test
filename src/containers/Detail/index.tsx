import { useQuery } from '@apollo/client'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HomeIcon from '@mui/icons-material/Home'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { StyledLoading } from 'containers/Loading/styled'
import { GET_DETAIL_USER } from 'graphql/query'
import Layout from 'layout'

import { StyledDetailContainer } from './styled'

const DetailContainer = () => {
  const router = useRouter()
  const { id: login } = router.query
  const { loading, data, error } = useQuery(GET_DETAIL_USER, {
    variables: {
      login: login,
    },
  })
  const renderLogo = useCallback(() => {
    return (
      <Link href="/">
        <HomeIcon fontSize="large" />
      </Link>
    )
  }, [])
  const renderContent = () => {
    if (loading) {
      return (
        <StyledLoading>
          <div className="spinner"></div>
        </StyledLoading>
      )
    }
    if (!!error?.message) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <ErrorOutlineIcon fontSize="large" color="error" />
          <Typography variant="h6" align="center">
            Something went wrong
          </Typography>
        </Box>
      )
    }
  }
  return (
    <Layout title="Favorite" logoEl={renderLogo()} hiddenFooter>
      <StyledDetailContainer>{renderContent()}</StyledDetailContainer>
    </Layout>
  )
}

export default DetailContainer
