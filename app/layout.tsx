import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Geist } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/smooth-scroll';
import { Cursor } from '@/components/cursor';
import { Nav } from '@/components/nav';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Musharraf Shaik — The Architecture of Intent',
  description:
    'Data-driven B2B marketing strategist. Engineering revenue from signal, not noise. ESSEC MiM · GMAT 735.',
  openGraph: {
    title: 'Musharraf Shaik — The Architecture of Intent',
    description: "I don't just market. I engineer revenue.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrains.variable} ${geist.variable}`}>
      <body className="bg-ink-950 text-bone vignette grain antialiased">
        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
