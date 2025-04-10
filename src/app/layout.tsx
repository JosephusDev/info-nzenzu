import type { Metadata } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { QueryClient } from '@tanstack/react-query'
import Providers from './providers'

const geistSans = Nunito_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Nunito({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Info Nzenzu',
  description: 'Website de informações da Universidade Nzenzu Estrela Uige',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  return (
    <html lang='pt'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='font-[family-name:var(--font-geist-sans)]'>
          <Providers>{children}</Providers>
        </div>
        <Toaster richColors />
      </body>
    </html>
  )
}
