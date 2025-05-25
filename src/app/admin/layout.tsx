'use client'; // Make the layout a client component to manage sidebar state

import React, { useState } from 'react';
import { Menu } from 'lucide-react'; // Assuming lucide-react for icons
import AdminSidebar from '@/components/admin/sidebar'; // Assuming lucide-react for icons
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - hidden on small screens, flex on medium and larger */}
      <aside
        className={`w-64 bg-gray-800 text-white p-4 flex-shrink-0 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static fixed inset-y-0 left-0`}
      >
        <AdminSidebar />
      </aside>

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* Mobile Sidebar Toggle Button */}
        <header className="bg-gray-900 text-white p-4 md:hidden flex items-center justify-between z-50">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
            {/* Replace with an actual icon later (e.g., hamburger icon) */}
            Toggle Sidebar
          </Button>
          <div className="text-xl font-bold">Admin Dashboard</div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
