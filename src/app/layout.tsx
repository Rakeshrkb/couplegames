import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'couplegames — Free Games & Prompts for Couples',
  description: 'Over 30+ free online games for couples. Would You Rather, Truth or Dare, Deep Questions, 36 Questions to Fall in Love, and date night starters. No sign-up needed.',
  keywords: [
    'couple games',
    'games for couples',
    'would you rather couples',
    'truth or dare couples',
    'date night games',
    'deep questions couples',
    'relationship games',
    '36 questions to fall in love'
  ],
  authors: [{ name: 'couplegames' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-gray-900 bg-white selection:bg-rose-500 selection:text-white">
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
