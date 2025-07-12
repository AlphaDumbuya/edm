'use client';

import { AppUser, getAllUsers } from '@/lib/db/users';
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from './actions';
import { useSession } from 'next-auth/react';

interface UserManagementClientProps {
  initialUsers: AppUser[];
  initialTotalCount: number;
}

const UserManagementClient: React.FC<UserManagementClientProps> = ({
  initialUsers,
  initialTotalCount,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams() || new URLSearchParams();

  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [totalUsers, setTotalUsers] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | undefined>(searchParams.get('role') || undefined);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [usersPerPage] = useState(10);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const initialSearch = searchParams.get('search');
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, []); // Empty dependency array to run only once on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch users when search, filter, or page changes
  useEffect(() => {
    if (!mounted) return;
    const fetchUsers = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (roleFilter && roleFilter !== 'all') params.set('role', roleFilter);
      if (currentPage > 1) params.set('page', currentPage.toString());
      params.set('limit', usersPerPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotalUsers(data.totalCount);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [searchQuery, roleFilter, currentPage, usersPerPage, router, mounted]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (value: string | undefined) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const confirmDelete = async () => {
    if (selectedUserId) {
      await deleteUserAction(selectedUserId);
      window.location.reload();
    }
  };

  // Refresh handler
  const handleRefresh = async () => {
    setLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    const page = parseInt(params.get('page') || '1');
    const limit = usersPerPage;
    const role = params.get('role') || undefined;
    const search = params.get('search') || '';
    const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}&role=${role || ''}&search=${search}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
      setTotalUsers(data.totalCount);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-full sm:max-w-xs md:max-w-2xl lg:max-w-4xl mx-auto py-4 sm:py-6 md:py-10 px-2 sm:px-4 md:px-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg border border-gray-800 flex flex-col gap-4 text-xs sm:text-sm md:text-base max-w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full mb-2">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold w-full sm:w-auto text-left tracking-tight mb-2 sm:mb-0">User Management</h1>
        <div className="flex w-full sm:w-auto justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow w-auto justify-center focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={handleRefresh}
            title="Refresh user list"
            disabled={loading}
          >
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581m-2.638 2.638A7.974 7.974 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657-.507-3.197-1.382-4.462m2.638-2.638A7.974 7.974 0 0112 4c4.418 0 8 3.582 8 8 0-1.657-.507-3.197-1.382 4.462" />
              </svg>
              <span>Refresh</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full mb-2 text-xs">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input-white-icons text-xs px-2 py-2 w-full bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400 focus:ring-primary focus:border-primary rounded-md max-w-full sm:max-w-[160px]"
        />
        <Select value={roleFilter === undefined ? 'all' : roleFilter} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-full sm:w-auto bg-gray-800 text-gray-100 border border-gray-700 focus:ring-primary focus:border-primary rounded-md text-xs px-2 py-2">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent className="z-[999] bg-gray-900 text-gray-100 border border-gray-700">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <p className="text-gray-400 text-xs">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400 text-xs">No users found.</p>
      ) : (
        <div className="w-full text-xs">
          {/* Card layout for mobile, table for sm+ */}
          <div className="flex flex-col gap-4 sm:hidden">
            {users.map((user: AppUser) => (
              <div key={user.id} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2 shadow border border-gray-700">
                <div className="text-xs text-gray-400 font-semibold">ID: <span className="text-gray-100 break-all">{user.id}</span></div>
                <div className="text-xs text-gray-400 font-semibold">Email: <span className="text-gray-100 break-all">{user.email}</span></div>
                <div className="text-xs text-gray-400 font-semibold">Name: <span className="text-gray-100 break-all">{user.name || 'N/A'}</span></div>
                <div className="flex flex-row gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (session?.user?.role !== 'SUPER_ADMIN') return;
                      router.push(`/admin/users/edit/${user.id}`);
                    }}
                    disabled={session?.user?.role !== 'SUPER_ADMIN'}
                    title={session?.user?.role !== 'SUPER_ADMIN' ? 'Only Super Admin can edit users.' : 'Edit user'}
                    className="text-primary font-semibold w-auto min-w-[40px] max-w-[80px] shadow px-2 py-1 text-xs text-center"
                  >
                    Edit
                  </Button>
                  {status !== 'loading' && (
                    <Button
                      disabled={session?.user?.role !== 'SUPER_ADMIN'}
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (session?.user?.role !== 'SUPER_ADMIN') return;
                        setSelectedUserId(user.id);
                        setShowDeleteDialog(true);
                      }}
                      title={session?.user?.role !== 'SUPER_ADMIN' ? 'Only Super Admin can delete users.' : 'Delete user'}
                      className="w-auto min-w-[40px] max-w-[80px] shadow px-2 py-1 text-xs text-center"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Table layout for sm+ */}
          <div className="hidden sm:block">
            <Table className="min-w-[400px] w-full border border-gray-800 rounded-lg overflow-hidden text-xs">
              <TableHeader>
                <TableRow className="bg-gray-800 text-xs">
                  <TableHead className="hidden xs:table-cell text-xs whitespace-nowrap text-gray-300">ID</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-gray-300">Email</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-gray-300">Name</TableHead>
                  <TableHead className="text-xs whitespace-nowrap text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: AppUser) => (
                  <TableRow key={user.id} className="hover:bg-gray-800/70 transition border-b border-gray-800 text-xs sm:text-sm">
                    <TableCell className="hidden xs:table-cell text-xs sm:text-sm md:text-base break-words text-gray-100 max-w-[120px] xs:max-w-none whitespace-normal">{user.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm md:text-base break-words text-gray-100 max-w-[180px] xs:max-w-none whitespace-normal">{user.email}</TableCell>
                    <TableCell className="text-xs sm:text-sm md:text-base break-words text-gray-100 max-w-[140px] xs:max-w-none whitespace-normal">{user.name || 'N/A'}</TableCell>
                    <TableCell className="flex flex-row flex-wrap gap-2 text-xs sm:text-sm whitespace-nowrap w-full items-center xs:flex-row">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (session?.user?.role !== 'SUPER_ADMIN') return;
                          router.push(`/admin/users/edit/${user.id}`);
                        }}
                        disabled={session?.user?.role !== 'SUPER_ADMIN'}
                        title={session?.user?.role !== 'SUPER_ADMIN' ? 'Only Super Admin can edit users.' : 'Edit user'}
                        className="text-primary font-semibold w-auto min-w-[40px] max-w-[80px] shadow px-2 py-1 text-xs text-center"
                      >
                        Edit
                      </Button>
                      {status !== 'loading' && (
                        <Button
                          disabled={session?.user?.role !== 'SUPER_ADMIN'}
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (session?.user?.role !== 'SUPER_ADMIN') return;
                            setSelectedUserId(user.id);
                            setShowDeleteDialog(true);
                          }}
                          title={session?.user?.role !== 'SUPER_ADMIN' ? 'Only Super Admin can delete users.' : 'Delete user'}
                          className="w-auto min-w-[40px] max-w-[80px] shadow px-2 py-1 text-xs text-center"
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <div className="w-full mt-4">
        <div className="relative flex flex-row items-center w-full">
          <div className="flex-1">
            <Button
              className="w-auto min-w-[80px] max-w-[120px] px-4 py-2 text-sm shadow font-semibold"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-gray-300 text-center text-sm font-medium">Page {currentPage} of {totalPages}</span>
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              className="w-auto min-w-[80px] max-w-[120px] px-4 py-2 text-sm shadow font-semibold"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-gray-900 text-gray-100 border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex flex-row gap-2 justify-end flex-wrap sm:flex-nowrap">
              <AlertDialogCancel className="bg-gray-700 text-gray-100 hover:bg-gray-600 min-w-max">Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700 min-w-max" onClick={confirmDelete}>Continue</AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagementClient;
