import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/layout/app-providers';
import NavRenderer from '@/components/layout/nav-renderer';
import FooterVisibility from '@/components/layout/FooterVisibility';
import { ClientSessionProvider } from '@/components/providers/client-session-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className="antialiased flex flex-col h-full">
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
