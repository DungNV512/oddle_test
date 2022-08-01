import React, { useCallback } from 'react'
import LogoGithub from 'assets/logo-github.svg'
import LogoGithubMark from 'assets/logo-github-mark.svg'
import { StyledEmpty } from './styled'
import { Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  searchKey?: string
}

const Empty = (props: Props) => {
  const { searchKey } = props
  const renderContent = useCallback(() => {
    if (searchKey) {
      return (
        <>
          <SearchIcon fontSize="large" color="disabled" />
          <Typography variant="body2" align="center">
            No search result found for
          </Typography>
          <Typography variant="body2" align="center" fontWeight={700}>
            {searchKey}
          </Typography>
        </>
      )
    }
    return (
      <>
        <LogoGithubMark />
        <LogoGithub />
        <Typography variant="body2" align="center" color="#00000080;">
          Enter GitHub username and search users matching the input like Google
          Search, click avatars to view more details, including repositories,
          followers and following.
        </Typography>
      </>
    )
  }, [searchKey])
  return <StyledEmpty>{renderContent()}</StyledEmpty>
}

export default Empty
