// src/components/dashboard/user-profile-form.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, type User } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, UserCircle as UserProfileIcon } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Display name cannot be empty' }).max(50, { message: 'Display name too long'}),
  email: z.string().email().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfileForm() {
  const { user, updateUserProfile, refreshUser, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const typedUser = user as User | null;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (typedUser) {
      form.reset({
        name: typedUser.name || '',
        email: typedUser.email || '',
      });
    }
  }, [typedUser, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    const result = await updateUserProfile({ name: data.name });
    setIsLoading(false);
    if (result.error) {
      toast({
        title: 'Profile Update Failed',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved.',
      });
      await refreshUser();
    }
  };

  if (authLoading) {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-primary"><UserProfileIcon className="mr-2 h-6 w-6" /> My Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!typedUser) {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-destructive"><UserProfileIcon className="mr-2 h-6 w-6" /> Error</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40 text-center text-muted-foreground">
            Could not load user profile. Please try logging in again.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-primary"><UserProfileIcon className="mr-2 h-6 w-6" /> My Profile</CardTitle>
        <CardDescription>View and update your personal information.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              disabled
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed here. Contact support if needed.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Your Name"
              {...form.register('name')}
              disabled={isLoading || authLoading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={
              !!isLoading ||
              !!authLoading
            }
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
