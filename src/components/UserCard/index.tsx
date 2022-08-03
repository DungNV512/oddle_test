import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
  Avatar,
  Box,
  Card as MuiCard,
  IconButton,
  Typography
} from '@mui/material'
import { red } from '@mui/material/colors'
import _get from 'lodash/get'
import Link from 'next/link'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectIsFavorited } from 'selectors/favorite'
import { useFavoriteSlice } from 'slices/favorite'
import { abbreviateNumber } from 'utils/helpers'

import { StyledUserCard, StyledUserCardButton } from './styled'

interface Props {
  info: {
    id: string
    login: string
    avatarUrl: string
    followers?: {
      totalCount?: number
    }
    following?: {
      totalCount?: number
    }
  }
}
const UserCard = (props: Props) => {
  const { info } = props
  const { actions } = useFavoriteSlice()
  const dispatch = useDispatch()
  const isFavorited = useSelector(selectIsFavorited(info?.id))

  const totalFollowers = useMemo(
    () => _get(info, 'followers?.totalCount', 0),
    [info],
  )
  const totalFollowings = useMemo(
    () => _get(info, 'following?.totalCount', 0),
    [info],
  )

  const onToggleFavorite = () => {
    if (isFavorited) {
      dispatch(actions.removeFavorite(info.id))
    } else {
      dispatch(actions.appendFavorite({ user: info }))
    }
  }

  return (
    <StyledUserCard>
      <MuiCard sx={{ borderRadius: '10px' }}>
        <StyledUserCardButton>
          <IconButton aria-label="settings" onClick={onToggleFavorite}>
            {isFavorited ? (
              <FavoriteIcon fontSize="small" htmlColor={red[500]} />
            ) : (
              <FavoriteBorderIcon fontSize="small" htmlColor={red[500]} />
            )}
          </IconButton>
        </StyledUserCardButton>
        <Box sx={{ display: 'flex', padding: '8px', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            sx={{ bgcolor: red[500], width: 64, height: 64 }}
            src={info.avatarUrl}
          />
          <Box sx={{ ml: 1.5, flex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ mb: 1.5 }}
              fontSize={14}
              className="user-card__name"
              title={info.login}
            >
              <Link href={`/detail/${info.login}`}>
                {info.login || 'Organization'}
              </Link>
            </Typography>
            {totalFollowers > 0 ? (
              <Typography color="text.secondary" fontSize={12}>
                {`${abbreviateNumber(totalFollowers)} followers`}
              </Typography>
            ) : null}
            {totalFollowings > 0 ? (
              <Typography color="text.secondary" fontSize={12}>
                {`${abbreviateNumber(totalFollowings)} followings`}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </MuiCard>
    </StyledUserCard>
  )
}

export default UserCard
