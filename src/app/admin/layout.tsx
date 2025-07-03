'use client'; // Make the layout a client component to manage sidebar state

import React, { useState } from 'react';
import { Menu } from 'lucide-react'; // Use only `Menu`, not `MenuIcon`
import AdminSidebar from '@/components/admin/sidebar';
import { Button } from '@/components/ui/button';
import AdminFooter from '@/components/admin/AdminFooter';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth = 'w-64'; // Define sidebar width for consistent margin

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-gray-200 p-0 flex-shrink-0 w-64
          fixed z-40 h-full top-0 left-0 transition-transform duration-300 ease-in-out
          md:static md:z-auto md:h-auto md:overflow-visible md:block md:min-h-screen md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Admin sidebar"
      >
        <div className="h-full flex flex-col pt-[96px]">
          <AdminSidebar onLinkClick={() => {
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          }} />
        </div>
      </aside>

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Sidebar Toggle Button */}
        <header className="bg-white text-gray-900 p-4 md:hidden flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-gray-900 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Open sidebar">
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 pt-[128px] p-6 bg-gray-100 lg:p-6">
          {children}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
