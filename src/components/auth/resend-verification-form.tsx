// src/components/auth/resend-verification-form.tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function ResendVerificationForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Resend Verification Email'}
      </Button>
    </form>
  );
}
