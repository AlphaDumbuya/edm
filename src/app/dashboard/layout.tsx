// src/app/dashboard/layout.tsx
'use client';

import React from 'react'; // Removed useEffect as it's no longer used for redirection
import { useAuth } from '@/contexts/auth-context';
// import { useRouter } from 'next/navigation'; // No longer needed for client-side redirect
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { Loader2 } from 'lucide-react';
import Link from 'next/link'; // Import Link for the fallback message

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  // const router = useRouter(); // Router not needed for client-side redirect here anymore

  // The middleware is now the primary guard for protected routes.
  // The useEffect that previously handled client-side redirection is removed
  // to prevent potential race conditions with AuthContext state updates.

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  // If loading is false and there's still no user,
  // it implies that even if middleware allowed access (e.g. for a brief moment before session invalidation),
  // the AuthContext has confirmed no valid client-side session.
  // Instead of redirecting (which middleware should handle for unauthorized access attempts),
  // we show a message. This also helps if the user manually clears cookies while on a dashboard page.
  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <LayoutDashboard className="h-16 w-16 text-destructive mb-4" />
            <p className="text-xl font-semibold text-foreground mb-2">Access Denied</p>
            <p className="text-muted-foreground mb-6 text-center">
              You must be logged in to view the dashboard.
            </p>
            <Link href="/auth/login" className={buttonVariants({variant: "default"})}>
                Go to Login
            </Link>
        </div>
    );
  }

  // If user exists and loading is false, render the dashboard.
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,80px))] bg-muted/30">
      <DashboardSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
