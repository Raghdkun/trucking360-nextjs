'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext'
import LoadingOverlay from './LoadingOverlay'

function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, loadingMessage } = useLoading()

  return (
    <>
      {children}
      <LoadingOverlay show={isLoading} message={loadingMessage} />
    </>
  )
}

function AOSInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 1000,
        offset: 120,
        easing: 'ease-in-out',
        once: false,
      })

      const handleScroll = () => {
        if (window.scrollY === 0) {
          AOS.refresh()
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <LoadingWrapper>
        {children}
        <AOSInitializer />
      </LoadingWrapper>
    </LoadingProvider>
  )
}