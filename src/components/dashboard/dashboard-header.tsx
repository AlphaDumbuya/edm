'use client';

import { MenuIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardHeader({ isOpen, setIsOpen }: DashboardHeaderProps) {
  return (
    <header className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border shadow-md">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar menu"
      >
        <MenuIcon className="h-6 w-6" />
      </Button>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'outline', size: 'default' }))}
      >
        Home
      </Link>
    </header>
  );
}