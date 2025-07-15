// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, User, Settings, Activity, ShieldCheck, Mail, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardPage({ setSidebarOpen, sidebarOpen }: { setSidebarOpen?: (open: boolean) => void, sidebarOpen?: boolean }) {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pt-0 lg:pt-0" style={{ paddingTop: 'calc(56px + 1rem)' }}>
      {/* Dashboard menu toggle and Home button (simple, not in a header) */}
      <div className="flex items-center gap-4 mb-2 lg:hidden">
        {setSidebarOpen && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen?.(!sidebarOpen)}
            aria-label="Toggle dashboard menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </Button>
        )}
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
      </div>
      {/* Welcome Card */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8 bg-card rounded-xl p-6 shadow-md">
        <Avatar className="h-20 w-20 ring-2 ring-primary">
          <AvatarImage src={undefined} alt={user?.name || user?.email || 'User'} />
          <AvatarFallback>{user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary mb-1">Welcome, {user?.name || user?.email || 'User'}!</h2>
          <p className="text-muted-foreground text-sm">This is your personal dashboard for EDM.</p>
          {user?.email && (
            <p className="text-muted-foreground text-xs mt-1">{user.email}</p>
          )}
        </div>
      </div>
      {/* Quick Stats/Notifications Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-primary/90 to-primary text-white shadow-lg">
          <CardContent className="py-6 flex flex-col items-center">
            <LayoutDashboard className="h-8 w-8 mb-2" />
            <div className="text-lg font-semibold">0</div>
            <div className="text-xs">Dashboard Items</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="py-6 flex flex-col items-center">
            <User className="h-8 w-8 mb-2 text-primary" />
            <div className="text-lg font-semibold">Profile</div>
            <div className="text-xs text-muted-foreground">Manage your info</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="py-6 flex flex-col items-center">
            <Settings className="h-8 w-8 mb-2 text-primary" />
            <div className="text-lg font-semibold">Settings</div>
            <div className="text-xs text-muted-foreground">Account preferences</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="py-6 flex flex-col items-center">
            <Activity className="h-8 w-8 mb-2 text-primary" />
            <div className="text-lg font-semibold">Activity</div>
            <div className="text-xs text-muted-foreground">Recent actions</div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Access */}
      <section>
        <SectionTitle title="Quick Access" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/profile" legacyBehavior>
            <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">My Profile</CardTitle>
                <UserCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">View and update your personal information.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/settings" legacyBehavior>
             <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">Account Settings</CardTitle>
                <Settings className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Manage your account preferences.</p>
              </CardContent>
            </Card>
          </Link>
           <Card className="hover:shadow-xl transition-shadow group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">Recent Activity</CardTitle>
                <Activity className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">No recent activity to display yet.</p>
              </CardContent>
            </Card>
        </div>
      </section>
      {/* Account Info */}
      <section>
        <SectionTitle title="Account Information" />
         <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <UserCircle className="mr-2 h-6 w-6 text-primary" /> {user?.name || 'User Details'}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {user?.email && (
                    <p className="text-muted-foreground flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-primary" /> Email: <span className="font-medium text-foreground ml-1">{user.email}</span>
                    </p>
                )}
                {/* Placeholder for when/if these fields are added to session/DB
                <p className="text-sm text-muted-foreground">
                    Email Verified: {user?.emailVerified ? "Yes" : "No (Verification pending)"}
                </p>
                 <p className="text-sm text-muted-foreground">
                    Member since: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </p>
                */}
                <p className="text-sm text-muted-foreground">More account details can be managed in your profile.</p>
            </CardContent>
         </Card>
      </section>
      <section className="text-center">
        <Link href="/">
            <Button variant="outline">Back to Homepage</Button>
        </Link>
      </section>
    </div>
  );
}
