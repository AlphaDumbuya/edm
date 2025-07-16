'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import React from 'react';

export default function NavRenderer() {
  const pathname = usePathname();
  // Hide Navbar on all /admin routes
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }
  return <Navbar />;
}