import { useLazyQuery } from '@apollo/client'
import { Box, Grid, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

import RepoCard from 'components/RepoCard'
import TabPanel from 'components/TabPanel'
import UserCard from 'components/UserCard'
import { StyledLoading } from 'containers/Loading/styled'
import {
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
  GET_USER_REPOSITORIES,
} from 'graphql/query'
import { abbreviateNumber } from 'utils/helpers'

interface ICount {
  repositories?: number
  followers?: number
  followings?: number
}

interface Props {
  count: ICount
}

const TABS = ['Repositories', 'Followers', 'Followings']
const TAB_ID = {
  REPOSITORIES: 'repositories',
  FOLLOWERS: 'followers',
  FOLLOWINGS: 'followings',
}
const TabsContent = (props: Props) => {
  const { count } = props
  const router = useRouter()
  const { id: login } = router.query
  const [
    getUserRepositories,
    { loading: isLoadingRepositories, data: userRepositories },
  ] = useLazyQuery(GET_USER_REPOSITORIES)
  const [
    getUserFollowers,
    { loading: isLoadingFollowers, data: userFollowers },
  ] = useLazyQuery(GET_USER_FOLLOWERS)
  const [
    getUserFollowings,
    { loading: isLoadingFollowings, data: userFollowings },
  ] = useLazyQuery(GET_USER_FOLLOWING)
  const [value, setValue] = useState<string>(TAB_ID.REPOSITORIES)

  const getLabel = (prefix: string, count?: number) => {
    return prefix + `${count ? ' (' + abbreviateNumber(count) + ')' : ''}`
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const renderLoading = useCallback(() => {
    return (
      <StyledLoading>
        <div className="spinner"></div>
      </StyledLoading>
    )
  }, [])

  const renderListRepositories = () => {
    if (isLoadingRepositories) {
      return renderLoading()
    }
    return (
      <Grid
        container
        spacing={2}
        marginTop={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {userRepositories?.user?.repositories?.edges.map((item: any) => (
          <Grid item xs={2} sm={4} md={6} key={item?.node?.id}>
            <RepoCard info={item?.node} />
          </Grid>
        ))}
      </Grid>
    )
  }

  const renderListFollowers = () => {
    if (isLoadingFollowers) {
      return renderLoading()
    }
    return (
      <Grid
        container
        spacing={2}
        padding="10px 0"
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {userFollowers?.user?.followers?.edges.map((item: any) => (
          <Grid item xs={2} sm={4} md={6} key={item?.node?.id}>
            <UserCard info={item?.node} />
          </Grid>
        ))}
      </Grid>
    )
  }

  const renderListFollowings = () => {
    if (isLoadingFollowings) {
      return renderLoading()
    }
    return (
      <Grid
        container
        spacing={2}
        padding="10px 0"
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {userFollowings?.user?.following?.edges.map((item: any) => (
          <Grid item xs={2} sm={4} md={6} key={item?.node?.id}>
            <UserCard info={item?.node} />
          </Grid>
        ))}
      </Grid>
    )
  }

  useEffect(() => {
    if (value === TAB_ID.REPOSITORIES) {
      getUserRepositories({
        variables: {
          login,
        },
      })
    }
    if (value === TAB_ID.FOLLOWERS) {
      getUserFollowers({
        variables: {
          login,
        },
      })
    }
    if (value === TAB_ID.FOLLOWINGS) {
      getUserFollowings({
        variables: {
          login,
        },
      })
    }
  }, [value])

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          {TABS.map((tab, index) => {
            const label = getLabel(
              tab,
              count[tab.toLowerCase() as keyof ICount],
            )
            return (
              <Tab key={tab} value={tab.toLowerCase()} label={label} wrapped />
            )
          })}
        </Tabs>
        <TabPanel value={value} index={TAB_ID.REPOSITORIES}>
          {renderListRepositories()}
        </TabPanel>
        <TabPanel value={value} index={TAB_ID.FOLLOWERS}>
          {renderListFollowers()}
        </TabPanel>
        <TabPanel value={value} index={TAB_ID.FOLLOWINGS}>
          {renderListFollowings()}
        </TabPanel>
      </Box>
    </>
  )
}

export default TabsContent
