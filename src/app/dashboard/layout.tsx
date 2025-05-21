// src/app/dashboard/layout.tsx
'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { Loader2, LayoutDashboard } from 'lucide-react'; // Added LayoutDashboard
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button'; // Added buttonVariants

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

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

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,80px))] bg-muted/30">
      <DashboardSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
