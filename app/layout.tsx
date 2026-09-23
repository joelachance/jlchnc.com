import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProviderWrapper } from './theme-provider';
import { SiteFooter } from './site-footer';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
const berkeleyMono = localFont({
  src: '../public/fonts/BerkeleyMonoVariable.otf',
  variable: '--font-berkeley-mono'
});
const fkGroteskNeue = localFont({
  src: [
    { path: '../public/fonts/FKGroteskNeue-Light.otf', weight: '300', style: 'normal' },
    { path: '../public/fonts/FKGroteskNeue-LightItalic.otf', weight: '300', style: 'italic' },
    { path: '../public/fonts/FKGroteskNeue-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/FKGroteskNeue-MediumItalic.otf', weight: '500', style: 'italic' }
  ],
  variable: '--font-fk-grotesk-neue'
});
const radwave = localFont({
  src: '../public/fonts/Radwave.otf',
  variable: '--font-radwave'
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
      className={`${geist.variable} ${geistMono.variable} ${berkeleyMono.variable} ${radwave.variable} ${fkGroteskNeue.variable} ${fkGroteskNeue.className} font-light bg-white antialiased tracking-tight page-fade-in min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-6 sm:p-8 md:ml-[5vw] dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200`}
    >
      <body className="flex flex-1 flex-col">
        <ThemeProviderWrapper>
          <div className="flex flex-1 flex-col">
            <main className="essay-main w-full self-start space-y-2">
              {children}
            </main>
            <SiteFooter />
            <Analytics />
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
