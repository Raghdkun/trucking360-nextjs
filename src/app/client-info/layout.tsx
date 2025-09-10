import { Metadata } from 'next'
import './style.css'

export const metadata: Metadata = {
  title: 'Client Information - Trucking 360 Solutions',
  description: 'Provide your client information to get started with Trucking 360 Solutions. Complete our secure form to begin your journey towards optimized trucking operations.',
  keywords: [
    'client information',
    'trucking 360 registration',
    'client onboarding',
    'trucking services signup',
    'fleet management registration',
    'transportation services',
    'logistics consultation',
    'trucking solutions'
  ],
  openGraph: {
    title: 'Client Information - Trucking 360 Solutions',
    description: 'Provide your client information to get started with Trucking 360 Solutions.',
    type: 'website',
    siteName: 'Trucking 360 Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Information - Trucking 360 Solutions',
    description: 'Provide your client information to get started with Trucking 360 Solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ClientInfoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="client-info-layout">
      {children}
    </div>
  )
}