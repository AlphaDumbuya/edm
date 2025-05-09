// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, User, Settings, Activity, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader 
        title={`Welcome, ${user?.displayName || user?.email || 'User'}!`}
        subtitle="This is your personal dashboard."
        icon={LayoutDashboard} 
      />

      <section>
        <SectionTitle title="Quick Access" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Profile</CardTitle>
                <User className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">View and update your personal information.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/settings">
             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Settings</CardTitle>
                <Settings className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Manage your account preferences.</p>
              </CardContent>
            </Card>
          </Link>
           <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">No recent activity to display yet.</p>
              </CardContent>
            </Card>
        </div>
      </section>
      
      <section>
        <SectionTitle title="Account Status" />
         <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <ShieldCheck className="mr-2 h-6 w-6 text-green-500" /> Account Verified
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Your email address <span className="font-medium text-foreground">{user?.email}</span> is {user?.emailVerified ? "verified." : "not verified yet."}
                </p>
                {!user?.emailVerified && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Please check your email for a verification link, or request a new one if needed.
                    </p>
                )}
                 <p className="text-sm text-muted-foreground mt-2">
                    Member since: {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </p>
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
