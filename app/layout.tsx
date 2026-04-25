import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Cursor } from '@/components/cursor';
import { Nav } from '@/components/nav';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

const jbmono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Musharraf Shaik — The Architecture of Intent',
  description:
    'Data-driven B2B marketing strategist. ESSEC MiM. Engineering revenue through Build · Measure · Analyze · Deploy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jbmono.variable} ${inter.variable}`}
    >
      <body className="bg-ink-950 text-bone-100 antialiased font-sans">
        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}