import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import Providers from './providers'
import { ThemeProvider } from '@/contexts/ThemeContext'

const geistSans = Poppins({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const geistMono = Poppins({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
  return (
    <html lang='pt'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className='font-[family-name:var(--font-geist-sans)]'>
            <Providers>{children}</Providers>
          </div>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
