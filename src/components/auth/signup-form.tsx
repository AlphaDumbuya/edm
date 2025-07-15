// src/components/auth/signup-form.tsx
'use client';

import { useState } from 'react';
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
import Link from 'next/link'; // Keep this import
import { Loader2, UserPlus } from 'lucide-react';

// Update the schema to enforce all password requirements
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50, { message: 'Name too long.'}),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const passwordRequirements = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
  { label: "One special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    const { error } = await signUp(data.email, data.password, data.name);
    setIsLoading(false);

    if (error) {
      toast({
        title: 'Signup Failed',
        description: error,
        variant: 'destructive',
      });
    } 
    // No redirect here; context handles it
 };

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');
  const strength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <UserPlus className="mr-2 h-6 w-6" /> Create Account
        </CardTitle>
        <CardDescription>Enter your details below to create a new account.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...form.register('name')}
              disabled={isLoading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...form.register('email')}
              disabled={isLoading}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" x2="23" y1="1" y2="23"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </Button>
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a secure password"
              {...form.register('password')}
              disabled={isLoading}
              autoComplete="new-password"
            />
            {/* Password strength meter: only show when password is not empty */}
            {password && (
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 rounded transition-all duration-300 ${
                    strength <= 2 ? "bg-red-500 w-1/4" : strength === 3 ? "bg-yellow-500 w-2/4" : strength === 4 ? "bg-blue-500 w-3/4" : "bg-green-500 w-full"
                  }`}
                />
              </div>
            )}
            {/* Password requirements list: only show when password is not empty */}
            {password && (
              <ul className="text-xs text-gray-600 space-y-1">
                {passwordRequirements.map(req => (
                  <li key={req.label} className={req.test(password) ? "text-green-600" : "text-gray-600"}>
                    {req.test(password) ? "✓" : "✗"} {req.label}
                  </li>
                ))}
              </ul>
            )}
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" x2="23" y1="1" y2="23"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </Button>
            </div>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              {...form.register('confirmPassword')}
              disabled={isLoading}
              autoComplete="new-password"
            />
            {/* Real-time match feedback */}
            {confirmPassword && (
              <p className={`text-xs ${passwordsMatch ? 'text-green-600' : 'text-destructive'}`}>{passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}</p>
            )}
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
 Log In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
