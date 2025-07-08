import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard 360 - Real-Time Analytics & Performance Tracking',
  description: 'Unlock the power of Dashboard 360 with real-time insights, automated reporting, and performance metrics. Transform your trucking operations with data-driven decisions.',
  keywords: [
    'dashboard 360',
    'trucking analytics',
    'real-time performance tracking',
    'fleet dashboard',
    'trucking metrics',
    'operational insights',
    'performance analytics',
    'trucking data visualization'
  ],
  openGraph: {
    title: 'Dashboard 360 - Real-Time Analytics & Performance Tracking',
    description: 'Unlock the power of Dashboard 360 with real-time insights, automated reporting, and performance metrics.',
    url: 'https://trucking360solutions.com/dashboard360',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard 360 - Real-Time Analytics & Performance Tracking',
    description: 'Unlock the power of Dashboard 360 with real-time insights, automated reporting, and performance metrics.',
  },
  alternates: {
    canonical: '/dashboard360',
  },
}

export default function Dashboard360Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}