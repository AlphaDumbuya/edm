import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Suspense, StrictMode } from 'react';
import { AppProviders } from '@/components/layout/app-providers'; // Assuming AppProviders existsimport ClientSessionProvider from '@/components/providers/client-session-provider'; // Import the client-only wrapper
import { ClientSessionProvider } from '@/components/providers/client-session-provider'; // Import ClientSessionProvider as a named export

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
 <body
 className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
 >
 <Suspense fallback={<div>Loading...</div>}>
 <ClientSessionProvider>
 <AppProviders>
 <Navbar />
 <main className='flex-grow container mx-auto px-4 py-6 sm:py-8'>{children}</main>
 <Footer />
 </AppProviders>
 </ClientSessionProvider>
 </Suspense>
 </body>
 </html>
 )
}
