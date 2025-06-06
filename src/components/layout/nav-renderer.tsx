'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import React from 'react';

export default function NavRenderer() {
  const pathname = usePathname();

  return <Navbar />;
}