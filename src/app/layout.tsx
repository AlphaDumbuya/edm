'use client';
import type { Metadata } from 'next';
import { Inter, GeistSans, GeistMono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import { AppProviders } from '@/components/layout/app-providers';
import NavRenderer from '@/components/layout/nav-renderer'; // Import the new NavRenderer component
import FooterVisibility from '@/components/layout/FooterVisibility'; // Import the new FooterVisibility component
import { ClientSessionProvider } from '@/components/providers/client-session-provider'; // Import the ClientSessionProvider

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistSans = GeistSans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
 return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}>
 <ClientSessionProvider>
          <AppProviders>
            <NavRenderer /> {/* Use the NavRenderer component here */}
            <main className='flex-grow container mx-auto px-4 py-6 sm:py-8'>{children}</main>
          </AppProviders>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
