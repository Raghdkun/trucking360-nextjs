'use client'

import { useEffect, useState } from 'react'

interface SpinnerProps {
  show?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
}

const Spinner = ({ 
  show = false, 
  className = '', 
  size = 'md',
  color = 'primary'
}: SpinnerProps) => {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)
  }, [show])

  if (!isVisible) return null

  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2', 
    lg: 'w-8 h-8 border-4'
  }

  const colorClasses = {
    primary: 'border-primary border-t-transparent',
    secondary: 'border-secondary border-t-transparent',
    white: 'border-white border-t-transparent'
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner