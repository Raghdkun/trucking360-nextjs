'use client'

import { useEffect, useState } from 'react'
import Spinner from './Spinner'

interface LoadingOverlayProps {
  show?: boolean
  message?: string
  backdrop?: boolean
}

const LoadingOverlay = ({ 
  show = false, 
  message = 'Loading...', 
  backdrop = true 
}: LoadingOverlayProps) => {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)
    
    // Prevent body scroll when overlay is visible
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      backdrop ? 'bg-black bg-opacity-30' : ''
    }`}>
      <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
        <Spinner show={true} size="lg" color="primary" />
        {message && (
          <p className="text-gray-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  )
}

export default LoadingOverlay