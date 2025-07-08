import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Consultation - Trucking 360 Solutions',
  description: 'Schedule a consultation with Trucking 360 experts. Get personalized advice on dispatch services, fleet management, and achieving Fantastic+ status in the AFP program.',
  keywords: [
    'book trucking consultation',
    'schedule dispatch meeting',
    'trucking 360 booking',
    'AFP consultation',
    'fleet management consultation',
    'dispatch service booking',
    'trucking solutions meeting'
  ],
  openGraph: {
    title: 'Book a Consultation - Trucking 360 Solutions',
    description: 'Schedule a consultation with Trucking 360 experts. Get personalized advice on dispatch services and fleet management.',
    url: 'https://trucking360solutions.com/booking',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Consultation - Trucking 360 Solutions',
    description: 'Schedule a consultation with Trucking 360 experts. Get personalized advice on dispatch services and fleet management.',
  },
  alternates: {
    canonical: '/booking',
  },
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}