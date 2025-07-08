import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Trucking 360 Solutions',
  description: 'Get answers to common questions about Trucking 360 dispatch services, pricing, dashboard features, and support. Learn how we help achieve Fantastic+ ratings.',
  keywords: [
    'trucking 360 FAQ',
    'dispatch service questions',
    'fleet management FAQ',
    'AFP program questions',
    'trucking dispatch support',
    'pricing questions',
    'dashboard 360 FAQ'
  ],
  openGraph: {
    title: 'Frequently Asked Questions - Trucking 360 Solutions',
    description: 'Get answers to common questions about Trucking 360 dispatch services, pricing, dashboard features, and support.',
    url: 'https://trucking360solutions.com/faqs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions - Trucking 360 Solutions',
    description: 'Get answers to common questions about Trucking 360 dispatch services, pricing, dashboard features, and support.',
  },
  alternates: {
    canonical: '/faqs',
  },
}

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}