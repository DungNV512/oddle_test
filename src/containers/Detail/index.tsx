import { useQuery } from '@apollo/client'
import ApartmentIcon from '@mui/icons-material/Apartment'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HomeIcon from '@mui/icons-material/Home'
import { Avatar, Box, Typography } from '@mui/material'
import _get from 'lodash/get'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { StyledLoading } from 'containers/Loading/styled'
import { GET_DETAIL_USER } from 'graphql/query'
import Layout from 'layout'

import { StyledAddressWrapper, StyledDetailContainer } from './styled'
import TabsContent from './TabsContent'

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
    const repositoriesCount = _get(data, 'user.repositories.totalCount')
    const followersCount = _get(data, 'user.followers.totalCount')
    const followingsCount = _get(data, 'user.following.totalCount')

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
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          marginY={2}
        >
          <Avatar
            sx={{ width: '160px', height: '160px' }}
            src={data?.user?.avatarUrl}
          />
          {data?.user?.name ? (
            <Typography variant="h5">{data?.user?.name}</Typography>
          ) : null}
          <Typography variant="body2" color="text.secondary">
            {data?.user?.login}
          </Typography>
          {data?.user?.location ? (
            <StyledAddressWrapper>
              <ApartmentIcon color="disabled" fontSize="small" />
              <Typography variant="body2" color="text.secondary" marginLeft={1}>
                {data?.user?.location}
              </Typography>
            </StyledAddressWrapper>
          ) : null}
        </Box>
        <div>
          <TabsContent
            count={{
              repositories: repositoriesCount,
              followers: followersCount,
              followings: followingsCount,
            }}
          />
        </div>
      </>
    )
  }
  return (
    <Layout title="Favorite" logoEl={renderLogo()} hiddenFooter>
      <StyledDetailContainer>{renderContent()}</StyledDetailContainer>
    </Layout>
  )
}

export default DetailContainer
