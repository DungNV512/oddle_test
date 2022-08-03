import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import SearchIcon from '@mui/icons-material/Search'
import { Typography } from '@mui/material'
import { useCallback } from 'react'

import LogoGithubMark from 'assets/logo-github-mark.svg'
import LogoGithub from 'assets/logo-github.svg'

import { StyledEmpty } from './styled'

interface Props {
  searchKey?: string
  error: boolean
}

const Empty = (props: Props) => {
  const { searchKey, error = false } = props
  const renderContent = useCallback(() => {
    if (error) {
      return (
        <>
          <ErrorOutlineIcon fontSize="large" color="error" />
          <Typography variant="h6" align="center">
            Something went wrong
          </Typography>
        </>
      )
    }
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
