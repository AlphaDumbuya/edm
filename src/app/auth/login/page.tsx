// src/app/auth/login/page.tsx
import LoginForm from '@/components/auth/login-form';
import PageHeader from '@/components/shared/page-header';
import { LogIn } from 'lucide-react';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <PageHeader title="Log In" subtitle="Access your EDM account" icon={LogIn} />
        <LoginForm />
      </div>
    </Suspense>
  );
}
