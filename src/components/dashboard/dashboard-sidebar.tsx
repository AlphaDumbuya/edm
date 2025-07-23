// src/components/dashboard/dashboard-sidebar.tsx
'use client';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link'; // Keep Link
import { usePathname, } from 'next/navigation';
import { Settings, LogOut, LayoutDashboard, UserCircle, Home } from 'lucide-react';
import { Button, buttonVariants, } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { MenuIcon, XIcon } from 'lucide-react'; // Import icons for the toggle button

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
];

export default function DashboardSidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const { user: authUser, signOutAuth, loading: authContextLoading } = useAuth();

  // Use a more specific type for user if available from your User interface
  const user = authUser as User | null;


  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const names = name.split(' ');
      if (names.length > 1 && names[0] && names[names.length - 1]) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      if (names[0]) {
        return names[0].substring(0, 2).toUpperCase();
      }
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  // Close sidebar when clicking outside on small screens
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close sidebar if clicking outside the sidebar and it's open (on small screens)
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen && window.innerWidth < 1024) { // 1024px is the 'lg' breakpoint
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Conditional rendering for admin dashboard link
  const allowedAdminRoles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER'];
  const filteredNavItems = navItems.filter(item =>
    item.href !== '/admin' || (item.href === '/admin' && allowedAdminRoles.includes(user?.role as string))
  );
  console.log('User object:', user);
  console.log('User role:', user?.role);
  // Overlay for mobile
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside
        className={cn(
          // On mobile: fixed, z-30, slide-in, top-[64px]; On desktop: sticky, static, z-auto
          "left-0 w-64 bg-card border-r border-sidebar-border flex-col p-4 space-y-6 transition-transform duration-300 ease-in-out fixed top-16 z-40 h-[calc(100vh-4rem)] lg:static lg:top-0 lg:z-auto lg:h-screen lg:flex",
          isOpen ? 'translate-x-0 flex' : '-translate-x-full hidden lg:translate-x-0 lg:flex'
        )}
        ref={sidebarRef}
        aria-label="Dashboard sidebar"
        style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between lg:hidden mb-2">
          <span className="font-bold text-lg text-primary">Menu</span>
          <button
            className="p-2 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="text-center py-4">
          <Avatar className="h-12 w-12 mx-auto mb-2 border-2 border-primary">
            <AvatarImage src={user?.image || user?.photoURL || undefined} alt={user?.name || user?.email || 'User'} />
            <AvatarFallback>{user ? getInitials(user.name, user.email) : 'U'}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold text-sidebar-foreground truncate">{user?.name || user?.email || 'User'}</h2>
          <p className="text-xs text-muted-foreground">Member</p>
        </div>
        <nav>
          <ul className="space-y-2">
            {filteredNavItems.map(item => (
              <li key={item.href} className="cursor-pointer">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: pathname === item.href ? 'default' : 'ghost', size: 'default' }),
                    'w-full flex items-center gap-2 justify-start text-left px-4 py-2 rounded-lg transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-white shadow-md'
                      : 'hover:bg-muted hover:text-primary text-sidebar-foreground'
                  )}
                >
                  <span className="flex items-center gap-2 cursor-pointer">
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4">
          <Button
            variant="outline"
            className="w-full justify-start hover:bg-destructive/10 hover:text-destructive border-sidebar-border text-sidebar-foreground"
            onClick={signOutAuth}
            disabled={authContextLoading}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </aside>
    </>
  );
}

// Assuming User type is defined in AuthContext or globally
interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  photoURL?: string | null;
  image?: string | null;
  role?: string | null; // Add role property
  // Add any other fields you expect on the user object
}
