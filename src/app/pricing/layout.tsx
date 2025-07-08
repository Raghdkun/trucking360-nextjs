import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans - Trucking 360 Solutions',
  description: 'Transparent pricing for dispatch services, fleet management, hiring, and HR solutions. Pay only for accepted contracts with no hidden fees. Get started with Trucking 360 today.',
  keywords: [
    'trucking dispatch pricing',
    'fleet management cost',
    'dispatch service rates',
    'per contract pricing',
    'trucking 360 pricing',
    'Amazon freight partner pricing',
    'dispatch bundle pricing',
    'fantastic plus pricing'
  ],
  openGraph: {
    title: 'Pricing Plans - Trucking 360 Solutions',
    description: 'Transparent pricing for dispatch services, fleet management, hiring, and HR solutions. Pay only for accepted contracts with no hidden fees.',
    url: 'https://trucking360solutions.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Plans - Trucking 360 Solutions',
    description: 'Transparent pricing for dispatch services, fleet management, hiring, and HR solutions. Pay only for accepted contracts with no hidden fees.',
  },
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}