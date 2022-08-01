import { Typography } from '@mui/material'
import { ReactNode, useCallback } from 'react'
import { StyledHeader } from './styled'
import Switch from './Switch'

interface Props {
  title?: string
  logoEl?: ReactNode
}

const Header = (props: Props) => {
  const { title, logoEl } = props
  const renderTitle = useCallback(() => {
    if (logoEl) return logoEl
    return (
      <Typography
        variant="h1"
        component="div"
        sx={{ flexGrow: 1, fontWeight: 700, fontSize: 26 }}
      >
        {title}
      </Typography>
    )
  }, [title, logoEl])
  return (
    <StyledHeader>
      <div className="header-wrapper">
        {renderTitle()}
        <Switch />
      </div>
    </StyledHeader>
  )
}

export default Header
