import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Trucking 360 Solutions',
  description: 'Get in touch with Trucking 360 for dispatch services, fleet management, and AFP support. Contact our team for personalized solutions and 24/7 driver support.',
  keywords: [
    'contact trucking 360',
    'trucking dispatch contact',
    'fleet management support',
    'AFP services contact',
    'dispatch service inquiry',
    '24/7 support',
    'trucking solutions contact'
  ],
  openGraph: {
    title: 'Contact Us - Trucking 360 Solutions',
    description: 'Get in touch with Trucking 360 for dispatch services, fleet management, and AFP support. Contact our team for personalized solutions.',
    url: 'https://trucking360solutions.com/contact-us',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Trucking 360 Solutions',
    description: 'Get in touch with Trucking 360 for dispatch services, fleet management, and AFP support. Contact our team for personalized solutions.',
  },
  alternates: {
    canonical: '/contact-us',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}