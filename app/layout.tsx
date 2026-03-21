import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/ui/PageTransition'
import LenisProvider from '@/components/ui/LenisProvider'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OKMOND DRONES — Тактичні БПЛА',
  description: 'Тактичні безпілотні авіаційні системи для сил спеціальних операцій. Розроблено в Україні.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <PageTransition />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
