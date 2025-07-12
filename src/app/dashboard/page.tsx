// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 px-2">
      <div className="w-full max-w-3xl bg-white dark:bg-card rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
        <Avatar className="h-16 w-16 ring-2 ring-primary">
          <AvatarImage src={user?.image || user?.photoURL || undefined} alt={user?.name || user?.email || 'User'} />
          <AvatarFallback>{user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-primary mb-1">Account Information</h2>
          <p className="text-muted-foreground mb-4">Your personal account details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Full Name</div>
              <div className="font-medium text-lg">{user?.name || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium text-lg break-all">{user?.email || 'N/A'}</div>
            </div>
          </div>
          <Link href="/dashboard/profile">
            <Button variant="outline" className="mt-2">
              <span className="mr-2"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5Z"/></svg></span>
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
      <Link href="/" className="mt-8">
        <Button variant="ghost">Back to Homepage</Button>
      </Link>
    </div>
  );
}
