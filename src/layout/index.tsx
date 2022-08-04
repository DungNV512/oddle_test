import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingContainer from 'containers/Loading'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import { StyledContainer, StyledLayout } from './styled'

interface Props {
  children: ReactNode
  title?: string
  logoEl?: ReactNode
  hiddenFooter?: boolean
}

const Layout = (props: Props) => {
  const { children, title, logoEl, hiddenFooter = false } = props
  return (
    <StyledContainer>
      <Head>
        <title>Oddle Test</title>
        <meta name='description' content='Oddle Frontend Challenge' />
      </Head>
      <StyledLayout>
        <LoadingContainer>
          <Header title={title} logoEl={logoEl} />
          {children}
          {hiddenFooter ? null : <Footer />}
        </LoadingContainer>
      </StyledLayout>
    </StyledContainer>
  )
}

export default Layout
