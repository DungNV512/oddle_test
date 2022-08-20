import PeopleIcon from '@mui/icons-material/People'
import { Typography } from '@mui/material'
import { StyledEmpty } from './styled'

const Empty = () => {
  return (
    <StyledEmpty>
      <PeopleIcon fontSize="large" color="disabled" />
      <Typography variant="body2" align="center">
        Once you like people, you'll see them here.
      </Typography>
    </StyledEmpty>
  )
}

export default Empty
