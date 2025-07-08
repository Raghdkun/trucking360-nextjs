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

// Next.js Metadata API
export const metadata: Metadata = {
  title: 'Trucking 360 - Your Partner to Fantastic Plus',
  description: 'Best-in-class dispatch service with a fully automated metric dashboard, available 24/7 for your drivers.',
  robots: {
    index: true,
    follow: true,
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
            <Footer  />
            <NotificationOverlay />
          </ClientInitializer>
        </NotificationProvider>
        <MatomoAnalytics />
      </body>
    </html>
  );
}