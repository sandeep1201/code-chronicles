import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { RootLayoutWrapper } from '@/components/layout/root-layout-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code Chronicles - Learn, Build, Share',
  description:
    'A blog about software development, programming tutorials, and technical insights.',
  keywords: ['blog', 'programming', 'web development', 'tutorials', 'coding'],
  authors: [{ name: 'Code Chronicles' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.sandeepallala.com',
    siteName: 'Code Chronicles',
    title: 'Code Chronicles - Learn, Build, Share',
    description:
      'A blog about software development, programming tutorials, and technical insights.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Chronicles - Learn, Build, Share',
    description:
      'A blog about software development, programming tutorials, and technical insights.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.add(d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
