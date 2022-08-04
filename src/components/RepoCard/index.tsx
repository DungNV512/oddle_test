import { Box, Card, Typography } from '@mui/material'
import _get from 'lodash/get'
import { useCallback } from 'react'
import { abbreviateNumber } from 'utils/helpers'
import { StyledRepoCard } from './styled'

interface Props {
  info: {
    name: string
    stargazerCount?: number
    forkCount?: number
  }
}

const RepoCard = (props: Props) => {
  const { info } = props
  const stargazerCount = _get(info, 'stargazerCount', 0)
  const forkCount = _get(info, 'stargazerCount', 0)

  const renderRepoAchieve = useCallback(() => {
    const hasAchieve = stargazerCount > 0 || forkCount > 0
    if (hasAchieve) {
      return (
        <Box mt={2}>
          {stargazerCount > 0 ? (
            <Typography color="text.secondary" fontSize={12}>
              {`${abbreviateNumber(stargazerCount)} stars`}
            </Typography>
          ) : null}
          {forkCount > 0 ? (
            <Typography color="text.secondary" fontSize={12}>
              {`${abbreviateNumber(forkCount)} forks`}
            </Typography>
          ) : null}
        </Box>
      )
    }
    return null
  }, [stargazerCount, forkCount])

  return (
    <StyledRepoCard>
      <Card sx={{ borderRadius: '10px' }}>
        <Box padding={1}>
          <Typography
            fontWeight={600}
            className="repo-card__name"
            title={info.name}
          >
            {info.name}
          </Typography>
          {renderRepoAchieve()}
        </Box>
      </Card>
    </StyledRepoCard>
  )
}

export default RepoCard
