import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { StyledLoading } from './styled'

interface Props {
  children: ReactNode
}

const LoadingContainer = (props: Props) => {
  const { children } = props
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true)
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return loading ? (
    <StyledLoading>
      <div className="spinner"></div>
    </StyledLoading>
  ) : (
    <>{children}</>
  )
}

export default LoadingContainer
