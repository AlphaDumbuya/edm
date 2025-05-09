// src/app/dashboard/layout.tsx
'use client'; // This layout needs to be a client component to use useAuth and useRouter

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { Loader2 } from 'lucide-react';
import PageHeader from '@/components/shared/page-header'; // For potential dashboard header

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the useEffect redirect,
    // but it's a fallback.
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg text-muted-foreground">Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height,80px))]"> {/* Adjust for potential fixed header height */}
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-8 bg-muted/40">
        {/* You can add a dashboard-specific header here if needed */}
        {/* <PageHeader title="User Dashboard" /> */}
        {children}
      </main>
    </div>
  );
}
