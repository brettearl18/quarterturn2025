import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import ClientWrapper from './components/ClientWrapper'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { AuthProvider } from './components/AuthProvider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quarter Turn - Fitness Equipment & Services',
  description: 'Premium fitness equipment, personal training, and wellness services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        <AuthProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
          <ClientWrapper />
        </AuthProvider>
      </body>
    </html>
  )
} 