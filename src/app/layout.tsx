// app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClientInitializer } from '@/components/ClientInitializer';
import { MatomoAnalytics } from '@/components/MatomoAnalytics';
import { NotificationProvider } from '@/contexts/NotificationContext';
import NotificationOverlay from '@/components/NotificationOverlay';
import './globals.css';
import './app.css'
import './output.css'

// Setup the Poppins font with variable for Tailwind CSS
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

// Enhanced Next.js Metadata API
export const metadata: Metadata = {
  title: {
    default: 'Trucking 360 - Your Partner to Fantastic Plus',
    template: '%s | Trucking 360'
  },
  description: 'Best-in-class dispatch service with a fully automated metric dashboard, available 24/7 for your drivers. Achieve Fantastic+ results in the Amazon Freight Partner (AFP) program.',
  keywords: [
    'trucking dispatch',
    'Amazon Freight Partner',
    'AFP program',
    'dispatch service',
    'fleet management',
    'trucking dashboard',
    'driver metrics',
    'fantastic plus',
    'trucking 360'
  ],
  authors: [{ name: 'Trucking 360' }],
  creator: 'Trucking 360',
  publisher: 'Trucking 360',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://trucking360solutions.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Trucking 360 - Your Partner to Fantastic Plus',
    description: 'Best-in-class dispatch service with a fully automated metric dashboard, available 24/7 for your drivers.',
    url: 'https://trucking360solutions.com',
    siteName: 'Trucking 360',
    images: [
      {
        url: '/images/logo22.png',
        width: 1200,
        height: 630,
        alt: 'Trucking 360 Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trucking 360 - Your Partner to Fantastic Plus',
    description: 'Best-in-class dispatch service with a fully automated metric dashboard, available 24/7 for your drivers.',
    images: ['/images/logo22.png'],
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
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Font Awesome CSS */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className='font-sans bg-white'>
        <NotificationProvider>
          <ClientInitializer>
            <Header />
            <main>{children}</main>
            <Footer  settings={{
              website_name: 'Trucking 360',
              website_url: 'https://trucking360solutions.com',
              website_email: 'info@trucking360solutions.com',
              website_phone: '1-888-888-8888',
              website_address: '1234 Main St, Anytown, USA 12345',
            }} />
            <NotificationOverlay />
          </ClientInitializer>
        </NotificationProvider>
        <MatomoAnalytics />
      </body>
    </html>
  );
}