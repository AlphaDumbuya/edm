// src/app/auth/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Loader2, MailQuestion, ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/shared/page-header';
import { useAuth } from '@/contexts/auth-context';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const { sendPasswordReset } = useAuth();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    const { error } = await sendPasswordReset(data.email);
    
    if (error) {
      // Firebase's sendPasswordResetEmail doesn't typically reveal if an email exists for security.
      // So, we'll show a generic success message regardless of specific errors like 'auth/user-not-found'.
      // Log the actual error for debugging if needed.
      console.warn("Password reset attempt info/error:", error);
      toast({
        title: 'Password Reset Email Sent',
        description: 'If an account exists for this email, a password reset link has been sent.',
      });
      setEmailSent(true); // Always set to true to not reveal user existence
    } else {
      setEmailSent(true);
      toast({
        title: 'Password Reset Email Sent',
        description: 'If an account exists for this email, a password reset link has been sent.',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <PageHeader title="Forgot Password" subtitle="Reset your account password" icon={MailQuestion} />
      <Card className="w-full max-w-md shadow-xl">
        {!emailSent ? (
          <>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <MailQuestion className="mr-2 h-6 w-6" /> Reset Password
              </CardTitle>
              <CardDescription>Enter your email address and we'll send you a link to reset your password.</CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...form.register('email')}
                    disabled={isLoading}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MailQuestion className="mr-2 h-4 w-4" />}
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <Link href="/auth/login" className="w-full">
                  <Button variant="link" className="w-full text-sm text-muted-foreground">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Login
                  </Button>
                </Link>
              </CardFooter>
            </form>
          </>
        ) : (
          <>
            <CardHeader>
                <CardTitle className="flex items-center text-2xl text-primary">
                    <MailQuestion className="mr-2 h-6 w-6" /> Email Sent!
                </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If an account with that email exists, a password reset link has been sent. Please check your inbox (and spam folder).
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/auth/login" className="w-full">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
