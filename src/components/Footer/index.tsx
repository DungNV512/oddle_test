import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationProps,
  Paper,
  styled,
} from '@mui/material'
import { useRouter } from 'next/router'
import { SyntheticEvent, useCallback, useState } from 'react'

const ROUTES = ['/', '/liked']

const Navigation = styled((props: BottomNavigationProps) => (
  <BottomNavigation showLabels {...props}>
    <BottomNavigationAction label="Search" icon={<SearchIcon />} />
    <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} />
  </BottomNavigation>
))(() => ({
  height: '72px',
}))

const Footer = () => {
  const router = useRouter()
  const [value, setValue] = useState<number>(ROUTES.indexOf(router.asPath))
  const onChange = useCallback(
    (event: SyntheticEvent<Element, Event>, value: number) => {
      setValue(value)
      router.push(ROUTES[value])
    },
    [],
  )

  return (
    <Paper
      sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Navigation value={value} onChange={onChange} />
    </Paper>
  )
}

export default Footer
