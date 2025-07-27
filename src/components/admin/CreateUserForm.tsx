'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CreateUserFormProps {
  onSuccess?: () => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Debug session
  console.log('Session status:', status);
  console.log('Session data:', JSON.stringify(session, null, 2));
  
  // Debug useSession hook
  useEffect(() => {
    if (session?.user) {
      console.log('User email:', session.user.email);
      console.log('User role:', (session.user as any).role);
      console.log('Full user object:', JSON.stringify(session.user, null, 2));
    }
  }, [session]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'VIEWER',
    password: '',
    confirmPassword: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'VIEWER',
      password: '',
      confirmPassword: '',
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      if (!session) {
        throw new Error('You must be logged in to create users');
      }

      if (!session?.user?.email) {
        throw new Error('Session is invalid');
      }

      // Debug session data
      console.log('Full session:', session);
      console.log('User data:', session.user);
      
      // Try different ways to access role
      const userRole = session.user?.role || (session as any)?.role || (session.user as any)?.role;
      console.log('Detected user role:', userRole);
      
      // More permissive role check
      if (!userRole) {
        console.log('No role found in session');
        throw new Error('Role information not found in session');
      }
      
      const normalizedRole = userRole.toString().toUpperCase();
      console.log('Normalized role:', normalizedRole);
      
      if (!['SUPER_ADMIN', 'ADMIN'].includes(normalizedRole)) {
        console.log('Role not authorized:', normalizedRole);
        throw new Error(`Role '${normalizedRole}' is not authorized to create users`);
      }

      const res = await fetch('/api/admin/users', {
        method: 'POST',
        credentials: 'include',
        cache: 'no-cache',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
          createdBy: session.user.email
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401) {
          throw new Error('You are not authorized to create users. Please check your permissions.');
        }
        throw new Error(data.error || 'Failed to create user');
      }

      // Success
      setOpen(false);
      resetForm();
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700 font-medium shadow">
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[500px] md:w-[600px] bg-gray-900 text-gray-100 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Create New User</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new user to the EDM platform. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-gray-100">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-gray-200">Full Name</Label>
            <Input
              required
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              required
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your professional email address"
              className="w-full bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="role" className="text-gray-200">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectValue placeholder="Choose user access level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="SUPER_ADMIN" className="text-gray-100">Super Admin</SelectItem>
                <SelectItem value="ADMIN" className="text-gray-100">Admin</SelectItem>
                <SelectItem value="EDITOR" className="text-gray-100">Editor</SelectItem>
                <SelectItem value="VIEWER" className="text-gray-100">Viewer</SelectItem>
                <SelectItem value="USER" className="text-gray-100">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <div className="relative">
              <Input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter a secure password (min. 8 characters)"
                className="w-full bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 pr-10"
                minLength={8}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent hover:opacity-80 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
            <div className="relative">
              <Input
                required
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter your password"
                className="w-full bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 pr-10"
                minLength={8}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent hover:opacity-80 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="w-full sm:w-auto bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create User'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
