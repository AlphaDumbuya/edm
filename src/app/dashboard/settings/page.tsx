// src/app/dashboard/settings/page.tsx
"use client";

import PageHeader from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Bell, Shield, Palette } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  // Notification toggles
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSuccess, setNotifSuccess] = useState(false);

  // Security: password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Appearance: theme
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'system' : 'system'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'system';
      setTheme(savedTheme);
      document.documentElement.classList.remove('light', 'dark');
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
      if (savedTheme === 'light') document.documentElement.classList.add('light');
    }
  }, []);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', value);
      document.documentElement.classList.remove('light', 'dark');
      if (value === 'dark') document.documentElement.classList.add('dark');
      if (value === 'light') document.documentElement.classList.add('light');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordSuccess(false);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("All fields are required.");
      setPasswordSuccess(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      setPasswordSuccess(false);
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters.");
      setPasswordSuccess(false);
      return;
    }
    // Call backend
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setPasswordMessage('Password updated successfully!');
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMessage(err.message || 'Failed to update password.');
      setPasswordSuccess(false);
    }
  };

  // Load notification preferences from backend on mount
  useEffect(() => {
    async function fetchPrefs() {
      try {
        const res = await fetch('/api/user/notifications');
        if (!res.ok) throw new Error('Failed to load notification preferences');
        const data = await res.json();
        if (data) {
          setEmailNotifications(!!data.emailNotifications);
          setPushNotifications(!!data.pushNotifications);
        }
      } catch (err) {
        // Optionally show error
      }
    }
    fetchPrefs();
  }, []);

  // Handler to update notification preferences
  const handleNotifChange = async (type: 'email' | 'push', value: boolean) => {
    setNotifMessage("");
    setNotifSuccess(false);
    const newEmail = type === 'email' ? value : emailNotifications;
    const newPush = type === 'push' ? value : pushNotifications;
    setEmailNotifications(newEmail);
    setPushNotifications(newPush);
    try {
      const res = await fetch('/api/user/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailNotifications: newEmail, pushNotifications: newPush })
      });
      if (!res.ok) throw new Error('Failed to update preferences');
      setNotifMessage('Notification preferences updated!');
      setNotifSuccess(true);
    } catch (err: any) {
      setNotifMessage(err.message || 'Failed to update preferences.');
      setNotifSuccess(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Account Settings" 
        subtitle="Customize your account and notification preferences."
        icon={Settings} 
      />
      <div className="grid md:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Bell className="mr-2 h-5 w-5 text-primary"/> Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={emailNotifications} onChange={e => handleNotifChange('email', e.target.checked)} />
                Email notifications
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={pushNotifications} onChange={e => handleNotifChange('push', e.target.checked)} />
                Push notifications
              </label>
              {notifMessage && (
                <p className={`text-xs mt-2 ${notifSuccess ? 'text-green-600' : 'text-red-500'}`}>{notifMessage}</p>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Shield className="mr-2 h-5 w-5 text-primary"/> Security</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3" onSubmit={handlePasswordChange}>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="border rounded px-2 py-1 w-full pr-10 bg-background text-foreground placeholder:text-muted-foreground"
                />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShowCurrent(v => !v)} tabIndex={-1}>
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="border rounded px-2 py-1 w-full pr-10 bg-background text-foreground placeholder:text-muted-foreground"
                />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShowNew(v => !v)} tabIndex={-1}>
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="border rounded px-2 py-1 w-full pr-10 bg-background text-foreground placeholder:text-muted-foreground"
                />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button type="submit" className="bg-primary text-white rounded px-3 py-1 mt-2">Change Password</button>
              {passwordMessage && (
                <p className={`text-xs mt-1 ${passwordSuccess ? 'text-green-600' : 'text-red-500'}`}>{passwordMessage}</p>
              )}
            </form>
          </CardContent>
        </Card>
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg"><Palette className="mr-2 h-5 w-5 text-primary"/> Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="theme" value="system" checked={theme === 'system'} onChange={() => handleThemeChange('system')} />
                System
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => handleThemeChange('light')} />
                Light
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => handleThemeChange('dark')} />
                Dark
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
