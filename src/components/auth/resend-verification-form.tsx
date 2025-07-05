// src/components/auth/resend-verification-form.tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { useSearchParams } from 'next/navigation';

export default function ResendVerificationForm() {
  const { user } = useAuth();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const emailFromQuery = searchParams ? searchParams.get('email') : null;
  const email = user?.email || emailFromQuery || '';
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const { toast } = useToast();

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Error', description: 'No email found for current user.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setResent(false);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setResent(true);
        toast({ title: 'Verification Email Sent', description: 'Check your inbox for the verification email.' });
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to resend verification email.', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleResend} className="space-y-4 max-w-md mx-auto">
      <Button type="submit" className="w-full" disabled={loading || resent}>
        {loading ? 'Sending...' : resent ? 'Verification Email Resent' : 'Resend Verification Email'}
      </Button>
      {resent && (
        <div className="text-green-600 text-center text-sm">Verification email has been resent. Please check your inbox.</div>
      )}
    </form>
  );
}
