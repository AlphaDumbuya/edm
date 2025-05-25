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
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (mounted) {
      const params = new URLSearchParams(searchParams.toString());
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

  const confirmDelete = async () => {
    if (selectedUserId) {
      await deleteUserAction(selectedUserId);
      window.location.reload();
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Select value={roleFilter === undefined ? 'all' : roleFilter} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent className="z-[999]">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: AppUser) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name || 'N/A'}</TableCell>
                <TableCell className="flex gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex justify-between items-center mt-4">
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
