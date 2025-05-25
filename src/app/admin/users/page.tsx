'use client';

import { getAllUsers, AppUser } from '@/lib/db/users';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { deleteUserAction } from './actions';
import { useSession } from 'next-auth/react';

const UserManagementPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<AppUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [usersPerPage] = useState(10); // You can make this configurable

  const [mounted, setMounted] = useState(false);
  const { data: session } = mounted ? useSession() : { data: null };

  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * usersPerPage;
        const limit = usersPerPage;
        const data = await getAllUsers({
          search: searchQuery,
          role: roleFilter,
          offset,
          limit,
          orderBy: { createdAt: 'desc' }, // Example sorting
        });
        setUsers(data.users);
        setTotalUsers(data.totalCount);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // Handle error state
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Update URL search params
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (roleFilter) params.set('role', roleFilter);
    if (currentPage > 1) params.set('page', currentPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });

  }, [searchQuery, roleFilter, currentPage, usersPerPage, router]);

  useEffect(() => {
    setMounted(true);

  }, [searchQuery, roleFilter, currentPage, usersPerPage, router]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const confirmDelete = async () => {
    if (selectedUserId) {
      await deleteUserAction(selectedUserId);
      window.location.reload(); // Simple refresh after deletion
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            {/* Add other roles as needed */}
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
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name || 'N/A'}</TableCell> {/* Display 'N/A' if name is null */}
 <TableCell className="flex gap-2">
 <Button variant="outline" size="sm" onClick={() => router.push(`/admin/users/edit/${user.id}`)}>Edit</Button>
 <Button
 disabled={session?.user?.role === 'VIEWER'} // Disable if role is VIEWER
 variant="destructive"
 size="sm"
 onClick={() => {
 if (session?.user?.role !== 'VIEWER') { // Only show dialog if not VIEWER
 setSelectedUserId(user.id)
 setShowDeleteDialog(true)
 }
 }}
 >
 {session?.user?.role === 'VIEWER' ? 'View Only' : 'Delete'} {/* Optional: change button text */}
 </Button>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              and remove their data from our servers.
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

export default UserManagementPage;