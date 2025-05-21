// src/components/dashboard/dashboard-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button'; // Keep Button for the Log Out button
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, signOutAuth, loading: authContextLoading } = useAuth();

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const names = name.split(' ');
      if (names.length > 1) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <aside className="w-64 bg-card border-r border-sidebar-border flex flex-col p-4 space-y-6">
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
                  'w-full justify-start',
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
  );
}
