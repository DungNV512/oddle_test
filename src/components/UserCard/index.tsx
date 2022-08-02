// import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
  Avatar,
  Box,
  Card as MuiCard,
  IconButton,
  Typography
} from '@mui/material'
import { red } from '@mui/material/colors'

import { StyledUserCard, StyledUserCardButton } from './styled'

interface Props {
  info: {
    login: string
    avatar_url: string
  }
}
const UserCard = (props: Props) => {
  const { info } = props
  return (
    <StyledUserCard>
      <MuiCard sx={{ borderRadius: '10px' }}>
        <StyledUserCardButton>
          <IconButton aria-label="settings">
            <FavoriteBorderIcon fontSize="small" htmlColor={red[500]} />
          </IconButton>
        </StyledUserCardButton>
        <Box sx={{ display: 'flex', padding: '8px', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            sx={{ bgcolor: red[500], width: 64, height: 64 }}
            src={info.avatar_url}
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
              {info.login}
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              17,4K followers
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
              103 followings
            </Typography>
          </Box>
        </Box>
      </MuiCard>
    </StyledUserCard>
  )
}

export default UserCard
