import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css'

const geistSans = Work_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Work_Sans({
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
  return (
    <html lang='pt'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='font-[family-name:var(--font-geist-sans)]'>
          {children}
        </div>
      </body>
    </html>
  )
}
