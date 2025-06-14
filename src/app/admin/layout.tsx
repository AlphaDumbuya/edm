'use client'; // Make the layout a client component to manage sidebar state

import React, { useState } from 'react';
import { Menu, MenuIcon } from 'lucide-react'; // Assuming lucide-react for icons
import AdminSidebar from '@/components/admin/sidebar'; // Assuming lucide-react for icons
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/footer'; // Import the Footer component

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar - hidden on small screens, flex on medium and larger */}
      <aside
 className={`w-64 bg-gray-800 text-white p-4 flex-shrink-0 transform transition-transform duration-300 ease-in-out min-h-screen
 ${isSidebarOpen ? 'translate-x-0 fixed inset-y-0 left-0 z-50' : '-translate-x-full fixed inset-y-0 left-0 z-50'}
          md:translate-x-0 md:static md:flex`}
      >
        <AdminSidebar />
      </aside>

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Main Content Area which takes the remaining width */}
      <div className={`flex-1 flex flex-col transition-all duration-200`}>
        {/* Mobile Sidebar Toggle Button */}
        {/* This header is for the mobile toggle */}
        <header className="bg-gray-900 text-white p-4 md:hidden flex items-center justify-between z-50">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white cursor-pointer">
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="text-xl font-bold">Admin Dashboard</div>
        </header>
        
        <main className="flex-grow p-6 bg-gray-100 lg:p-0">
          {children}
        </main>
      </div>
    </div>
  );
}
