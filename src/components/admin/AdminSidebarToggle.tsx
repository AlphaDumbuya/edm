"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSidebarToggle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Overlay for small screens when sidebar is open
  return (
    <>
      <header className="bg-white text-gray-900 p-4 md:hidden flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-900 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        ></div>
      )}
    </>
  );
}
