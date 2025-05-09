// src/app/dashboard/settings/page.tsx
import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Account Settings" 
        subtitle="Customize your account and notification preferences."
        icon={Settings} 
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Bell className="mr-2 h-5 w-5 text-primary"/> Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage your email and push notification settings.</p>
            <p className="text-sm text-muted-foreground mt-4"> (Coming soon)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Shield className="mr-2 h-5 w-5 text-primary"/> Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Update your password and manage account security.</p>
             <p className="text-sm text-muted-foreground mt-4"> (Coming soon)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Palette className="mr-2 h-5 w-5 text-primary"/> Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Customize the look and feel of the application.</p>
             <p className="text-sm text-muted-foreground mt-4"> (Coming soon)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
