// src/app/auth/verify/page.tsx
"use client";
import ResendVerificationForm from '@/components/auth/resend-verification-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const sent = searchParams?.get('sent');
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error' | 'none'>(token ? 'verifying' : 'none');
  const [message, setMessage] = useState('');
  const [hasVerified, setHasVerified] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  useEffect(() => {
    if (!token || hasVerified) return;
    setStatus('verifying');
    setHasVerified(true);
    fetch(`/api/auth/verify?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully. You can now log in.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed. The link may be invalid or expired.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. Please try again.');
      });
  }, [token, hasVerified]);

  useEffect(() => {
    if ((status === 'success' || (status === 'error' && message.includes('already verified'))) && redirectCountdown > 0) {
      const timer = setTimeout(() => setRedirectCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if ((status === 'success' || (status === 'error' && message.includes('already verified'))) && redirectCountdown === 0) {
      router.replace('/auth/login?verified=true');
    }
  }, [status, message, redirectCountdown, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-primary">
            <Mail className="mr-2 h-6 w-6" /> Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === 'verifying' && (
            <div className="text-center">Verifying your email...</div>
          )}
          {status === 'success' && (
            <div className="text-center text-green-600 flex flex-col items-center">
              <CheckCircle className="h-8 w-8 mb-2" />
              {message}
              <div className="text-xs text-gray-500 mt-2">Redirecting to login in {redirectCountdown}...</div>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center text-red-600">
              {message}
              {message.includes('already verified') && (
                <div className="text-xs text-gray-500 mt-2">Redirecting to login in {redirectCountdown}...</div>
              )}
            </div>
          )}
          {status === 'none' && sent === '1' && (
            <>
              <div className="text-center text-green-600">
                Verification email sent! Please check your inbox.<br />
                Didn’t receive it? Resend Verification Email below.
              </div>
              <ResendVerificationForm />
            </>
          )}
          {status === 'none' && sent !== '1' && <ResendVerificationForm />}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
