"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import AdminFooter from "@/components/admin/AdminFooter";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  // All hooks must be called in the same order on every render
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showRoleNotice, setShowRoleNotice] = useState(false);
  const [roleNotice, setRoleNotice] = useState<string | null>(null);

  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const { signOutAuth } = useAuth();

  // Derived state using useMemo
  const role = React.useMemo(() => session?.user?.role, [session?.user?.role]);
  
  // Permissions memoization
  const permissions = React.useMemo(() => ({
    canManageUsers: role === 'SUPER_ADMIN',
    canEditContent: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(role || ''),
    canDeleteContent: ['SUPER_ADMIN', 'ADMIN'].includes(role || ''),
    canViewContent: true
  }), [role]);

  const handleLogout = React.useCallback(async () => {
    await signOutAuth();
    router.push('/');
  }, [signOutAuth, router]);


  // Theme setup effect
  React.useEffect(() => {
    const setupTheme = () => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('admin-theme', 'light');
      document.documentElement.classList.add('bg-gradient-to-br', 'from-gray-900', 'via-gray-950', 'to-gray-800');
      document.body.classList.add('bg-gradient-to-br', 'from-gray-900', 'via-gray-950', 'to-gray-800', 'text-gray-100');
    };

    setupTheme();
    
    return () => {
      document.documentElement.classList.remove('bg-gradient-to-br', 'from-gray-900', 'via-gray-950', 'to-gray-800');
      document.body.classList.remove('bg-gradient-to-br', 'from-gray-900', 'via-gray-950', 'to-gray-800', 'text-gray-100');
    };
  }, []);

  // Role notice effect
  React.useEffect(() => {
    if (!role) return;

    const notices = {
      VIEWER: 'You are logged in as a Viewer. You can browse and view all admin content, but you do not have permission to create, edit, or delete anything.',
      EDITOR: 'You are logged in as an Editor. You can create and edit content, but you cannot delete or manage users.',
      ADMIN: 'You are logged in as an Admin. You can create, edit, and delete content, but you cannot manage users and roles.'
    };

    const notice = notices[role as keyof typeof notices];
    const storageKey = `role-notice-dismissed-${role}`;
    const noticeDismissed = window.sessionStorage.getItem(storageKey);

    if (notice && !noticeDismissed) {
      setRoleNotice(notice);
      setShowRoleNotice(true);
    }
  }, [role]);

  // Permission enforcement callback
  const enforcePermission = React.useCallback((action: string) => {
    if (!role) return null;

    const permissionMap = {
      manageUsers: role === 'SUPER_ADMIN',
      edit: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(role),
      delete: ['SUPER_ADMIN', 'ADMIN'].includes(role)
    };

    const messages = {
      manageUsers: 'Only Super Admins can manage users and roles.',
      edit: 'You do not have permission to edit content based on your role.',
      delete: 'You do not have permission to delete content based on your role.'
    };

    if (action in permissionMap && !permissionMap[action as keyof typeof permissionMap]) {
      return (
        <div className="p-8 text-center text-red-600">
          Access denied: {messages[action as keyof typeof messages]}
        </div>
      );
    }
    return null;
  }, [role]);

  // Early returns for loading and access control
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!role || !['ADMIN', 'SUPER_ADMIN', 'EDITOR', 'VIEWER'].includes(role)) {
    return (
      <div className="p-8 text-center text-red-600">
        Access denied: You do not have permission to view this page.
      </div>
    );
  }

  // Only the admin navbar and sidebar are rendered here. The public site header/navbar is not included.
  // (No duplicate useEffect for theme/background setup)
  return (
    <div className="min-h-screen flex flex-col text-gray-100">
      {/* Admin Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-3 bg-gray-950 border-b border-gray-800 shadow-sm z-50 fixed top-0 left-0 right-0">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-extrabold tracking-wide text-green-400">EDM</span>
          <span className="text-lg font-semibold text-gray-300">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <AdminThemeToggle />
          <div className="flex items-center gap-2 md:gap-3 px-2 py-1 rounded-full bg-gray-800 border-2 border-green-400">
            <User className="w-5 h-5 text-green-400 mr-2" />
            <span className="font-semibold text-green-400 text-sm truncate max-w-[120px] md:max-w-[180px] lg:max-w-[240px]">{session?.user?.name || 'Alpha Dumbuya'}</span>
            <span className="hidden sm:inline text-xs text-gray-400 ml-2">{role || 'SUPER_ADMIN'}</span>
          </div>
        </div>
      </nav>
      <div className="flex flex-1 min-h-0 pt-[56px]">
        {/* Sidebar (desktop only) */}
        <aside
          className={`hidden md:block bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100 p-0 flex-shrink-0 w-72 h-[calc(100vh-56px)] sticky top-[56px] z-30`}
          aria-label="Admin sidebar"
          style={{ boxShadow: '2px 0 16px 0 rgba(0,0,0,0.12)' }}
        >
          <div className="h-full flex flex-col pt-8">
            <AdminSidebar onLinkClick={() => {}} />
            <div className="mt-auto mb-4 px-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm shadow"
                    style={{ minHeight: 0, minWidth: 0 }}
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border border-gray-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold text-gray-100">Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Are you sure you want to logout from the admin dashboard? You'll need to sign in again to access the administrative features.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 border-gray-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </aside>
        {/* Sidebar (mobile) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar overlay"></div>
        )}
        <aside
          className={`md:hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100 p-0 flex-shrink-0 w-72 fixed z-40 h-full top-0 left-0 pt-[56px] transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          aria-label="Admin sidebar"
          style={{ boxShadow: '2px 0 16px 0 rgba(0,0,0,0.12)' }}
        >
          <div className="h-full flex flex-col">
            <AdminSidebar onLinkClick={() => setIsSidebarOpen(false)} />
            <div className="mt-auto mb-4 px-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-semibold">Logout</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border border-gray-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold text-gray-100">Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Are you sure you want to logout from the admin dashboard? You'll need to sign in again to access the administrative features.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 border-gray-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile Sidebar Toggle Button */}
          <header className="bg-gray-900 text-gray-100 p-4 md:hidden flex items-center justify-between border-b border-gray-800">
            <Button variant="ghost" size="icon" className="text-gray-100 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Open sidebar">
              <Menu className="h-6 w-6" />
            </Button>
            <AdminThemeToggle />
          </header>
          <main className="flex-1 p-0 md:p-8 lg:p-12">
            {showRoleNotice && roleNotice && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="flex flex-col items-center justify-center bg-blue-50 border border-blue-200 text-blue-800 rounded shadow-lg p-8 max-w-lg w-full mx-4">
                  <span className="mb-6 text-center">{roleNotice}</span>
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => {
                      setShowRoleNotice(false);
                      window.sessionStorage.setItem(`role-notice-dismissed-${role}`, '1');
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
            {children}
          </main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
