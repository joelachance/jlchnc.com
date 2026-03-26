import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProviderWrapper } from './theme-provider';
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
    default: 'Joe LaChance',
    template: '%s | Joe LaChance'
  },
  description: 'A founder and creative building developer tools for AI.'
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
      className={`${geist.variable} ${geistMono.variable} ${berkeleyMono.variable} ${geistMono.className} bg-white`}
    >
      <body className="antialiased tracking-tight">
        <ThemeProviderWrapper>
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
            <main className="max-w-[60ch] w-full self-start space-y-2">
              {children}
            </main>
            <Footer />
            <Analytics />
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: '@jlchnc', url: 'https://x.com/jlchnc' },
    { name: 'github', url: 'https://github.com/joelachance' }
  ];

  return (
    <footer className="mt-12 text-left">
      <div className="flex justify-start items-center flex-wrap gap-x-4 gap-y-2 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:!text-[#c4716a] dark:hover:!text-[#e8a598] transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </footer>
  );
}
