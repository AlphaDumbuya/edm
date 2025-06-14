'use client'; // Make the layout a client component to manage sidebar state

import React, { useState } from 'react';
import { Menu } from 'lucide-react'; // Use only `Menu`, not `MenuIcon`
import AdminSidebar from '@/components/admin/sidebar';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-800 text-white p-4 flex-shrink-0 transform transition-transform duration-300 ease-in-out
          fixed z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0 md:flex`}
      >
        <AdminSidebar onLinkClick={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 md:ml-0`}
      >
        {/* Mobile Sidebar Toggle Button */}
        <header className="fixed top-[64px] left-0 right-0 bg-white text-gray-900 p-4 md:hidden flex items-center justify-between z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-900 cursor-pointer"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="text-xl font-bold flex-grow text-right">Admin Dashboard</div>
        </header>

        {/* Page Content */}
        <main className="flex-grow pt-[128px] p-6 bg-gray-100 lg:p-6">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
