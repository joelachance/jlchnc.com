import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProviderWrapper } from './theme-provider';
import { SiteHeader } from './site-header';
import { ThemeToggle } from './theme-toggle';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
const berkeleyMono = localFont({
  src: '../public/fonts/BerkeleyMonoVariable.otf',
  variable: '--font-berkeley-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jlchnc.com'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'jlchnc',
    template: '%s | jlchnc'
  },
  description: 'Joe LaChance\'s personal website',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${berkeleyMono.variable} ${geistMono.className} bg-white antialiased tracking-tight page-fade-in min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-6 sm:p-8 md:ml-[5vw] dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200`}
    >
      <body>
        <ThemeProviderWrapper>
          <div>
            <SiteHeader />
            <main className="essay-main w-full self-start space-y-2">
              {children}
            </main>
            <div className="mt-12 flex justify-start">
              <ThemeToggle />
            </div>
            <Analytics />
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
