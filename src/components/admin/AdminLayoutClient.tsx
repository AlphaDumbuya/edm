"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import AdminFooter from "@/components/admin/AdminFooter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Always remove dark mode from admin area
  React.useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('admin-theme', 'light');
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-gray-200 p-0 flex-shrink-0 w-64
          fixed z-40 h-full top-0 left-0 transition-transform duration-300 ease-in-out
          md:static md:z-auto md:h-auto md:overflow-visible md:block md:min-h-screen md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
        {/* Mobile Sidebar Toggle Button and Theme Toggle */}
        <header className="bg-white text-gray-900 p-4 md:hidden flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-gray-900 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Open sidebar">
            <Menu className="h-6 w-6" />
          </Button>
          <AdminThemeToggle />
        </header>
        {/* Desktop Theme Toggle */}
        <div className="hidden md:flex justify-end items-center bg-white p-2 pr-6 border-b border-gray-200">
          <AdminThemeToggle />
        </div>
        <main className="flex-1 pt-[128px] p-6 bg-gray-100 dark:bg-gray-900 lg:p-6">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
