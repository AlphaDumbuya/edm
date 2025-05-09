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
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileSchema = z.object({
  displayName: z.string().min(1, { message: 'Display name cannot be empty' }).max(50, { message: 'Display name too long'}),
  email: z.string().email().optional(), // Email is not editable here but shown
  // photoURL: z.string().url({ message: "Invalid URL for photo" }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfileForm() {
  const { user, updateUserProfile, refreshUser, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      email: '',
      // photoURL: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        displayName: user.displayName || '',
        email: user.email || '',
        // photoURL: user.photoURL || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    const result = await updateUserProfile({ displayName: data.displayName /*, photoURL: data.photoURL */ });
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
      refreshUser(); // Refresh user data in context
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (authLoading || !user) {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-primary"><UserCircle className="mr-2 h-6 w-6" /> My Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-primary"><UserCircle className="mr-2 h-6 w-6" /> My Profile</CardTitle>
        <CardDescription>View and update your personal information.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || user?.email || 'User'} data-ai-hint="user avatar placeholder" />
              <AvatarFallback>{getInitials(user?.displayName || user?.email)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm text-muted-foreground">Profile Picture</p>
                <Button type="button" variant="outline" size="sm" className="mt-1" disabled>Change (coming soon)</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              disabled // Email is usually not changed directly by user here
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
              {...form.register('displayName')}
              disabled={isLoading}
            />
            {form.formState.errors.displayName && (
              <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
            )}
          </div>
          {/* 
          <div className="space-y-2">
            <Label htmlFor="photoURL">Photo URL (Optional)</Label>
            <Input
              id="photoURL"
              type="url"
              placeholder="https://example.com/your-photo.jpg"
              {...form.register('photoURL')}
              disabled={isLoading}
            />
            {form.formState.errors.photoURL && (
              <p className="text-sm text-destructive">{form.formState.errors.photoURL.message}</p>
            )}
          </div>
          */}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full md:w-auto" disabled={isLoading || authLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
