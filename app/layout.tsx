import React from 'react';

import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from '@/contexts/themeContext';

import ScrollToTop from '@/components/common/ScrollToTop';
import { DirectionProvider } from '@/components/ui/direction';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const metadata: Metadata = {
  title: 'Kelas',
  description: 'developed by mohammad Djawad mousavian',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl' suppressHydrationWarning>
      <body className={` antialiased`}>
        <ThemeProvider attribute='class' enableSystem>
          <DirectionProvider dir='rtl' direction='rtl'>
            <main className='px-4 pt-8 pb-20 space-y-8'>{children}</main>
            <Toaster duration={1500} position='top-center' />
            <ScrollToTop />
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
