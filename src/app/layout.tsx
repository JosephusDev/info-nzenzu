import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import Providers from './providers'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { getTheme } from '@/lib/theme'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await getTheme()

  return (
    <html lang='pt' className={theme}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = '${theme}';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
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
