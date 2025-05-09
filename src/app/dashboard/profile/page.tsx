// src/app/dashboard/profile/page.tsx
import UserProfileForm from '@/components/dashboard/user-profile-form';
import PageHeader from '@/components/shared/page-header';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="User Profile" 
        subtitle="Manage your personal information and preferences."
        icon={UserCircle} 
      />
      <UserProfileForm />
    </div>
  );
}
