'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import { AppProviders } from '@/components/layout/app-providers';
import NavRenderer from '@/components/layout/nav-renderer';
import FooterVisibility from '@/components/layout/FooterVisibility';
import { ClientSessionProvider } from '@/components/providers/client-session-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased flex flex-col h-full`}>
        <ClientSessionProvider>
          <AppProviders>
            <NavRenderer />
            <main className='flex-grow container mx-auto px-4 py-6 sm:py-8'>{children}</main>
            <FooterVisibility />
          </AppProviders>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
