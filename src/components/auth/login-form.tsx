// src/components/auth/login-form.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import Link from 'next/link'; // Import Link from next/link
import { Loader2, LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [loginError, setLoginError] = useState<{ email?: boolean; password?: boolean }>({});
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const { signIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams(); // Call useSearchParams here
  
  // Show success toast if redirected from verification
  useEffect(() => {
    const verified = searchParams?.get('verified');
    if (verified === 'true') {
      toast({
        title: "Email Verified!",
        description: "Your email has been verified successfully. You can now log in.",
        duration: 5000,
      });
    }
  }, [searchParams, toast]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError({});
    setLoginErrorMsg('');
    const { error } = await signIn(data.email, data.password, searchParams);
    setIsLoading(false);

    if (error) {
      if (error.toLowerCase().includes('password')) {
        setLoginError({ password: true });
        setLoginErrorMsg('Invalid password.');
      } else if (error.toLowerCase().includes('email')) {
        setLoginError({ email: true });
        setLoginErrorMsg('Invalid email address.');
      } else {
        setLoginError({ email: true, password: true });
        setLoginErrorMsg('Invalid email or password.');
      }
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      // The redirect is now handled within the signIn function in auth-context.tsx
      // based on the searchParams or defaults to /dashboard
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <LogIn className="mr-2 h-6 w-6" /> Log In
        </CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...form.register('email')}
              disabled={isLoading}
              className={loginError.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
            {loginError.email && (
              <p className="text-sm text-destructive">{loginErrorMsg}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative"> {/* Wrap input and button in a relative container */}
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...form.register('password')}
                disabled={isLoading}
                className={`pr-10 ${loginError.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              <Button
                type="button" // Important: Make it a button to prevent form submission
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-1"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                disabled={isLoading}
              >
                {/* Use Eye or EyeOff icon based on showPassword state */}
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </Button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
            {loginError.password && (
              <>
                <p className="text-sm text-destructive">{loginErrorMsg}</p>
                <div className="flex justify-end mt-1">
                  <a href="/auth/forgot-password" className="text-xs text-primary hover:underline">Forgot password? Reset password</a>
                </div>
              </>
            )}
             <div className="flex justify-end">
                <Link href="/auth/forgot-password" // This page will be created later
                    className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
