import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Musharraf Shaik — Marketing Strategist',
  description:
    'Marketing strategist. Five engagements on file. Diagnoses where revenue is bleeding and builds the system that fixes it. ESSEC MiM. Available September 2026, Paris.',
  openGraph: {
    title: 'Musharraf Shaik — Marketing Strategist',
    description:
      'Five engagements. €14M synergy. $1.17B brand thesis. ₹4.2M direct revenue. 11× operational growth.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
