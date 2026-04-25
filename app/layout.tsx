import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SoundProvider } from '@/components/sound';
import { MonitorBar } from '@/components/monitor-bar';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DIAGNOSTIC — Musharraf Shaik',
  description:
    'A diagnostic interface for B2B revenue problems. Click a presenting symptom; the relevant case file loads.',
  openGraph: {
    title: 'DIAGNOSTIC — Musharraf Shaik',
    description:
      'A diagnostic interface for B2B revenue problems. Click a presenting symptom; the relevant case file loads.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${mono.variable}`}
    >
      <body className="font-mono">
        <SoundProvider>
          <MonitorBar />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
