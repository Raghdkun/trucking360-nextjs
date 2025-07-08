import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Choose Trucking 360 - Your Partner to Fantastic Plus',
  description: 'Discover why AFPs choose Trucking 360. Our core principles include customer obsession, highest standards, and bias for action. Learn about our commitment to excellence and Fantastic+ status.',
  keywords: [
    'why choose trucking 360',
    'AFP partner',
    'fantastic plus rating',
    'trucking dispatch excellence',
    'Amazon freight partner services',
    'core principles',
    'customer obsession',
    'operational excellence'
  ],
  openGraph: {
    title: 'Why Choose Trucking 360 - Your Partner to Fantastic Plus',
    description: 'Discover why AFPs choose Trucking 360. Our core principles and commitment to excellence help you achieve Fantastic+ status.',
    url: 'https://trucking360solutions.com/why-trucking-360',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose Trucking 360 - Your Partner to Fantastic Plus',
    description: 'Discover why AFPs choose Trucking 360. Our core principles and commitment to excellence help you achieve Fantastic+ status.',
  },
  alternates: {
    canonical: '/why-trucking-360',
  },
}

export default function WhyTrucking360Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}