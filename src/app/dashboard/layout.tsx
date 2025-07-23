// src/app/dashboard/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { Loader2, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button'; // Assumes this is a function

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Prevent rendering anything while redirecting
  }

  // If loading is false and user exists, render the dashboard
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-background border-b sticky top-16 z-30">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 hover:bg-muted rounded-lg"
          aria-label="Open menu"
        >
          <LayoutDashboard className="h-6 w-6" />
        </button>
        <h1 className="font-semibold text-lg">Dashboard</h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </header>
      
      <div className="flex flex-1">
        <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-grow flex-1 p-4 sm:p-6 md:p-8 bg-background overflow-y-auto">
          {/* Pass setIsOpen to children via context or props if needed */}
          {React.cloneElement(children as React.ReactElement, { setSidebarOpen: setIsOpen, sidebarOpen: isOpen })}
        </main>
      </div>
    </div>
  );
}
