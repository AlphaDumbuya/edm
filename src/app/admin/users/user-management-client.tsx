'use client';

import { AppUser } from '@/lib/db/users';
import { getAllUsersAction } from './actions';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
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
import { RefreshCw } from 'lucide-react';

interface UserManagementClientProps {
  initialUsers: AppUser[];
  initialTotalCount: number;
}

export const UserManagementClient: React.FC<UserManagementClientProps> = ({
  initialUsers,
  initialTotalCount,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [totalUsers, setTotalUsers] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | undefined>(searchParams?.get('role') ?? undefined);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams?.get('page') ?? '1'));
  const [usersPerPage] = useState(10);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const initialSearch = searchParams?.get('search');
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [searchParams]); // Added searchParams to dependencies since we're using it
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      if (searchQuery) params.set('search', searchQuery);
      if (roleFilter !== undefined) params.set('role', roleFilter);
      if (currentPage > 1) params.set('page', currentPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [searchQuery, roleFilter, currentPage, router, mounted, searchParams]);

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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * usersPerPage;
      const response = await getAllUsersAction({
        search: searchQuery,
        role: roleFilter === 'all' ? undefined : roleFilter,
        offset,
        limit: usersPerPage,
        orderBy: { createdAt: 'desc' }
      });
      
      if (response.success && response.data) {
        setUsers(response.data.users);
        setTotalUsers(response.data.totalCount);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchUsers();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Fetch users when search, filter, or pagination changes
  useEffect(() => {
    fetchUsers();
  }, [searchQuery, roleFilter, currentPage]);

  const confirmDelete = async () => {
    if (selectedUserId) {
      await deleteUserAction(selectedUserId);
      window.location.reload();
    }
  };

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">User Management</h1>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full sm:max-w-[200px]"
        />
        <Select value={roleFilter === undefined ? 'all' : roleFilter} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent className="z-[999]">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="EDITOR">Editor</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="VIEWER">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-4">No users found.</div>
      ) : (
        <div className="relative overflow-x-auto overflow-y-hidden border rounded-lg shadow -mx-4 sm:mx-0">
          <div className="w-full min-w-[800px] touch-pan-x">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">ID</TableHead>
                  <TableHead className="w-[30%]">Email</TableHead>
                  <TableHead className="w-[25%]">Name</TableHead>
                  <TableHead className="w-[20%] text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: AppUser) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-sm truncate max-w-[200px]">{user.id}</TableCell>
                    <TableCell className="truncate max-w-[250px]">{user.email}</TableCell>
                    <TableCell className="truncate max-w-[200px]">{user.name || 'N/A'}</TableCell>
                    <TableCell className="text-right whitespace-nowrap pr-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/admin/users/edit/${user.id}`)}
                        >
                          Edit
                        </Button>
                        {/* Conditionally render delete button based on session status and role */}
                        {status !== 'loading' && (
                          <Button
                            disabled={session?.user?.role === 'VIEWER'}
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (session?.user?.role !== 'VIEWER') {
                                setSelectedUserId(user.id);
                                setShowDeleteDialog(true);
                              }
                            }}
                          >
                            {session?.user?.role === 'VIEWER' ? 'View Only' : 'Delete'}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
 </Button>
      </div>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagementClient;
