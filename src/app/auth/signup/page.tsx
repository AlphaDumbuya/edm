// src/app/auth/signup/page.tsx
import SignupForm from '@/components/auth/signup-form';
import PageHeader from '@/components/shared/page-header';
import { UserPlus } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
       <PageHeader title="Sign Up" subtitle="Join EDM Connect today" icon={UserPlus} />
      <SignupForm />
    </div>
  );
}
