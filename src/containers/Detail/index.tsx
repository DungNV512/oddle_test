import Layout from 'layout'
import Link from 'next/link'
import { useCallback } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import { StyledDetailContainer } from './styled'

const DetailContainer = () => {
  const renderLogo = useCallback(() => {
    return (
      <Link href="/">
        <HomeIcon fontSize="large" />
      </Link>
    )
  }, [])
  return (
    <Layout title="Favorite" logoEl={renderLogo()} hiddenFooter>
      <StyledDetailContainer>
        <h1>Detail</h1>
      </StyledDetailContainer>
    </Layout>
  )
}

export default DetailContainer
