import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/footer';
import { AppProviders } from '@/components/layout/app-providers';
import NavRenderer from '@/components/layout/nav-renderer'; // Import the new NavRenderer componentimport { ClientSessionProvider } from '@/components/providers/client-session-provider'; // Import ClientSessionProvider as a named export
import { ClientSessionProvider } from '@/components/providers/client-session-provider';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EDM',
  description: 'Evangelism Discipleship Missions - Transforming lives in Sierra Leone, Oregon, and beyond.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) { 
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ClientSessionProvider>
          <AppProviders>
            <NavRenderer /> {/* Use the NavRenderer component here */}
            <main className='flex-grow container mx-auto px-4 py-6 sm:py-8'>{children}</main>
            <Footer />
          </AppProviders>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
