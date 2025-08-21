import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter - Trucking 360 Solutions',
  description: 'Stay updated with the latest insights, industry trends, and expert advice from Trucking 360. Our newsletter delivers valuable content to help optimize your trucking operations and drive business success.',
  keywords: [
    'trucking newsletter',
    'transportation industry news',
    'logistics insights',
    'trucking business tips',
    'fleet management updates',
    'trucking 360 solutions',
    'supply chain news',
    'commercial trucking'
  ],
  openGraph: {
    title: 'Newsletter - Trucking 360 Solutions',
    description: 'Stay updated with the latest insights, industry trends, and expert advice from Trucking 360.',
    type: 'website',
    siteName: 'Trucking 360 Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsletter - Trucking 360 Solutions',
    description: 'Stay updated with the latest insights, industry trends, and expert advice from Trucking 360.',
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

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="newsletter-layout">
      {children}
    </div>
  )
}