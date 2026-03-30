import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat, Italiana } from 'next/font/google';
import './globals.css';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';
import { Footer } from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/constants';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Luxury Safari Lodge in Big 5 Reserve | KwaZulu-Natal`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'safari lodge South Africa',
    'Big 5 safari',
    'luxury safari accommodation',
    'Manyoni Private Game Reserve',
    'KwaZulu-Natal safari',
    'Zululand safari',
    'game reserve lodging',
    'wildlife safari',
    'conservation safari',
    'exclusive safari experience',
    'boutique safari lodge',
    'Hluhluwe safari',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Luxury Big 5 Safari Lodge`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/images/manyoni-logo-dark.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | Luxury Big 5 Safari Lodge`,
    description: SITE_CONFIG.description,
    images: ['/images/manyoni-logo-dark.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/manyoni-ridge-logo-head-white.png',
    shortcut: '/images/manyoni-ridge-logo-head-white.png',
    apple: '/images/manyoni-ridge-logo-head-white.png',
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorantGaramond.variable} ${montserrat.variable} ${italiana.variable} antialiased`}
      >
        <HeaderWrapper />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
