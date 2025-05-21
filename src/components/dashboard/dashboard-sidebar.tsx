// src/components/dashboard/dashboard-sidebar.tsx
'use client';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link'; // Keep Link
import { usePathname, } from 'next/navigation';
import { Settings, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button, buttonVariants, } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { MenuIcon, XIcon } from 'lucide-react'; // Import icons for the toggle button

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
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
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        // Check if the click is not on the toggle button itself
        const toggleButton = document.getElementById('mobile-sidebar-toggle');
        if (toggleButton && !toggleButton.contains(event.target as Node)) {
           setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
     {/* Mobile toggle button - Hidden on larger screens */}
     <div className="lg:hidden p-4"> {/* Adjust padding or margin as needed */}
      <Button
       id="mobile-sidebar-toggle" // Add an ID to exclude from click outside
        variant="outline"
        size="default" // Use default size for a more prominent button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-center" // Center the button text
      >
        {isOpen ? (<XIcon className="h-6 w-6" />) : (<MenuIcon className="h-6 w-6" />)}
      </Button>
    </div>

    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-sidebar-border flex-col p-4 space-y-6 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:flex", // Ensure lg:flex is always present
        isOpen ? 'translate-x-0 flex' : '-translate-x-full hidden lg:flex'
      )}
      ref={sidebarRef}
    >
      <div className="text-center py-4">
        <Avatar className="h-20 w-20 mx-auto mb-2 border-2 border-primary">
          <AvatarImage src={user?.photoURL || undefined} alt={user?.name || user?.email || 'User'} data-ai-hint="user avatar placeholder" />
          <AvatarFallback>{user ? getInitials(user.name, user.email) : 'U'}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold text-sidebar-foreground truncate">{user?.name || user?.email || 'User'}</h2>
        <p className="text-xs text-muted-foreground">Member</p>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: pathname === item.href ? 'default' : 'ghost', size: 'default' }),
                  'w-full justify-start text-left', // Ensure text aligns left
                  pathname === item.href
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                    : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground'
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
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
  // Add any other fields you expect on the user object
}
