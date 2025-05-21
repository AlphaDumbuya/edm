// src/components/dashboard/dashboard-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
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
  const { user, signOutAuth, loading } = useAuth();

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col p-4 space-y-6">
      <div className="text-center py-4">
        <Avatar className="h-20 w-20 mx-auto mb-2 border-2 border-primary">
          <AvatarImage src={user?.photoURL || undefined} alt={user?.name || user?.email || 'User'} data-ai-hint="user avatar" />
          <AvatarFallback>{user ? getInitials(user.name, user.email) : 'U'}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold text-foreground truncate">{user?.name || user?.email || 'User'}</h2>
        <p className="text-xs text-muted-foreground">Member</p>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: pathname === item.href ? 'default' : 'ghost' }),
                  'w-full justify-start',
                  pathname === item.href ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground'
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
          className="w-full justify-start hover:bg-destructive/10 hover:text-destructive"
          onClick={signOutAuth}
          disabled={loading}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
