// src/app/auth/verify/page.tsx
"use client";
import ResendVerificationForm from '@/components/auth/resend-verification-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
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
      router.push('/login');
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
            <div className="text-center text-green-600 font-semibold">
              {message}
              <div className="mt-4 text-sm text-gray-500">
                Redirecting to login in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...<br />
                <button
                  className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  onClick={() => router.push('/login')}
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
          {status === 'error' && message.includes('already verified') && (
            <div className="text-center text-green-600 font-semibold">
              {message}
              <div className="mt-4 text-sm text-gray-500">
                Redirecting to login in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...<br />
                <button
                  className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  onClick={() => router.push('/login')}
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
          {status === 'none' && (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
              <h2 className="text-lg font-semibold mb-2">Check your inbox</h2>
              <p className="text-muted-foreground mb-4">
                We have sent a verification link to your email. Please check your inbox and follow the instructions to verify your account.
              </p>
              <p className="text-muted-foreground mb-4">
                Didn&apos;t receive the email? Enter your email below to resend the verification link.
              </p>
            </div>
          )}
          {(status === 'none' || status === 'error') && <ResendVerificationForm />}
        </CardContent>
      </Card>
    </div>
  );
}
