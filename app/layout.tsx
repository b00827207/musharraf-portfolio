import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AetherProvider } from '@/components/aether-core';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AETHER · Musharraf Shaik',
  description:
    'AETHER · An operating console of strategic engagements. Five live modules. Type a command. Available September 2026.',
  openGraph: {
    title: 'AETHER · Musharraf Shaik',
    description: 'An operating console. Five live engagements. Type a command.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${mono.variable}`}>
      <body className="antialiased">
        <AetherProvider>{children}</AetherProvider>
      </body>
    </html>
  );
}
