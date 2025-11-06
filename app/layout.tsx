import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'Telegram Mini App для обмена валют и управления профилем',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TMA',
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Telegram Mini App',
    title: 'Telegram Mini App',
    description: 'Telegram Mini App для обмена валют и управления профилем',
  },
  twitter: {
    card: 'summary',
    title: 'Telegram Mini App',
    description: 'Telegram Mini App для обмена валют и управления профилем',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover' as const,
  themeColor: '#2481cc',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}

