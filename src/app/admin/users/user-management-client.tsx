'use client';

import { AppUser } from '@/lib/db/users';
import { getAllUsersAction } from './actions';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from "@/components/ui/use-toast";
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
import { CreateUserForm } from '@/components/admin/CreateUserForm';

interface UserManagementClientProps {
  initialUsers?: AppUser[];
  initialTotalCount?: number;
}

// Cache interface
interface CacheEntry {
  users: AppUser[];
  totalCount: number;
  timestamp: number;
}

interface QueryKey {
  search: string;
  role?: string;
  page: number;
  limit: number;
}

// Create a cache with a 5-minute expiry
const cache = new Map<string, CacheEntry>();
const CACHE_EXPIRY = 2 * 60 * 1000; // 2 minutes in milliseconds - reduced to ensure fresher data

const createQueryKey = (params: QueryKey): string => {
  return `${params.search}-${params.role || 'all'}-${params.page}-${params.limit}`;
};

export function UserManagementClient({
  initialUsers = [],
  initialTotalCount = 0,
}: UserManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams() || new URLSearchParams();
  const { toast } = useToast();

  const [users, setUsers] = useState<AppUser[]>(Array.isArray(initialUsers) ? initialUsers : []);
  const [totalUsers, setTotalUsers] = useState(typeof initialTotalCount === 'number' ? initialTotalCount : 0);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [roleFilter, setRoleFilter] = useState<string | undefined>(searchParams?.get('role') ?? undefined);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams?.get('page') ?? '1', 10) || 1);
  const [usersPerPage] = useState(10);
  const { data: session, status } = useSession();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Debounce search timeout
  const searchTimeoutRef = React.useRef<NodeJS.Timeout>();

  const fetchUsers = useCallback(async (
    search: string,
    role: string | undefined,
    page: number,
    limit: number,
    ignoreCache = false
  ) => {
    const queryKey = createQueryKey({ search, role, page, limit });
    
    // Check cache first
    if (!ignoreCache) {
      const cached = cache.get(queryKey);
      if (cached && (Date.now() - cached.timestamp) < CACHE_EXPIRY) {
        setUsers(cached.users);
        setTotalUsers(cached.totalCount);
        return;
      }
    }

    setLoading(true);
    try {
      // Update URL params
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (role && role !== 'all') params.set('role', role);
      if (page > 1) params.set('page', page.toString());
      params.set('limit', limit.toString());
      
      // Update URL without causing a reload
      router.push(`?${params.toString()}`, { scroll: false });

      const response = await getAllUsersAction({
        search,
        role: role === 'all' ? undefined : role,
        offset: (page - 1) * limit,
        limit,
        orderBy: { createdAt: 'desc' }
      });

      if (response.success && response.data) {
        // Update cache
        cache.set(queryKey, {
          users: response.data.users,
          totalCount: response.data.totalCount,
          timestamp: Date.now()
        });

        setUsers(response.data.users);
        setTotalUsers(response.data.totalCount);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Memoize total pages calculation
  const totalPages = useMemo(() => Math.ceil(totalUsers / usersPerPage), [totalUsers, usersPerPage]);

  // Debounced search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchUsers(value, roleFilter, 1, usersPerPage, false);
    }, 500); // 500ms debounce - increased to reduce database load
  }, [roleFilter, usersPerPage, fetchUsers]);

  const handleRoleFilterChange = useCallback((value: string | undefined) => {
    setRoleFilter(value);
    setCurrentPage(1);
    fetchUsers(searchQuery, value, 1, usersPerPage, false);
  }, [searchQuery, usersPerPage, fetchUsers]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    fetchUsers(searchQuery, roleFilter, page, usersPerPage, false);
  }, [searchQuery, roleFilter, usersPerPage, fetchUsers]);



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialSearch = params.get('search') || '';
    const initialRole = params.get('role') || undefined;
    const initialPage = parseInt(params.get('page') || '1', 10);
    
    // Only fetch if we have different values than the initial props
    if (initialUsers.length === 0 || 
        initialSearch !== '' || 
        initialRole !== undefined || 
        initialPage !== 1) {
      fetchUsers(initialSearch, initialRole, initialPage, usersPerPage, false);
    }
  }, [fetchUsers, initialUsers.length, usersPerPage]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchUsers(searchQuery, roleFilter, currentPage, usersPerPage, true);
    } finally {
      setIsRefreshing(false);
    }
  }, [searchQuery, roleFilter, currentPage, usersPerPage, fetchUsers]);

  const confirmDelete = useCallback(async () => {
    if (!selectedUserId) return;
    
    try {
      const result = await deleteUserAction(selectedUserId);
      if (!result.success) {
        // Handle the error response directly without throwing
        toast({
          title: "Cannot Delete User",
          description: result.error || 'Failed to delete user',
          variant: "destructive",
        });
        setShowDeleteDialog(false);
        return;
      }
      // Refresh the current page
      await fetchUsers(searchQuery, roleFilter, currentPage, usersPerPage, true);
      setShowDeleteDialog(false);
      setSelectedUserId(null);
      // Show success toast
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  }, [selectedUserId, searchQuery, roleFilter, currentPage, usersPerPage, fetchUsers, toast]);

  return (
    <div className="w-full max-w-full sm:max-w-[95vw] lg:max-w-[90vw] 2xl:max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-4 bg-gray-900 text-gray-100 rounded-lg shadow-lg border border-gray-800 overflow-y-auto max-h-[90vh]">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">User Management</h1>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              <span className="text-gray-400">Total Users:</span>
              <span className="text-2xl font-bold text-primary">{totalUsers}</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 items-center">
            {session?.user?.role === 'SUPER_ADMIN' && (
              <div className="inline-block">
                <CreateUserForm onSuccess={handleRefresh} />
              </div>
            )}
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow min-w-[100px] focus:outline-none focus:ring-2 focus:ring-primary whitespace-nowrap"
              onClick={handleRefresh}
              title="Refresh user list"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full sm:w-[200px] px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 placeholder-gray-400 focus:ring-primary focus:border-primary rounded-md"
          />
          <Select value={roleFilter === undefined ? 'all' : roleFilter} onValueChange={handleRoleFilterChange}>
            <SelectTrigger className="w-full sm:w-[150px] bg-gray-800 text-gray-100 border border-gray-700 focus:ring-primary focus:border-primary rounded-md">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent className="z-[999] bg-gray-900 text-gray-100 border border-gray-700">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="EDITOR">Editor</SelectItem>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="VIEWER">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User List Section */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div>
              {loading ? (
                <p className="text-gray-400 text-sm p-4">Loading users...</p>
              ) : users.length === 0 ? (
                <p className="text-gray-400 text-sm p-4">No users found.</p>
              ) : (
                <div className="w-full">
                  {/* Card layout for mobile */}
                  <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {users.map((user: AppUser) => (
                      <div key={user.id} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-3 shadow border border-gray-700">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">ID: <span className="text-gray-100 break-all">{user.id}</span></div>
                          <div className="text-sm text-gray-400">Email: <span className="text-gray-100 break-all">{user.email}</span></div>
                          <div className="text-sm text-gray-400">Name: <span className="text-gray-100 break-all">{user.name || 'N/A'}</span></div>
                        </div>
                        <div className="flex flex-row gap-2 justify-start">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (session?.user?.role !== 'SUPER_ADMIN') return;
                              router.push(`/admin/users/edit/${user.id}`);
                            }}
                            disabled={session?.user?.role !== 'SUPER_ADMIN'}
                            title={session?.user?.role !== 'SUPER_ADMIN' ? 'Only Super Admin can edit users.' : 'Edit user'}
                            className="text-primary font-semibold shadow min-w-[80px]"
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
                              className="shadow min-w-[80px]"
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Table layout for tablet and desktop */}
                  <div className="hidden sm:block overflow-hidden">
                    <Table className="w-full border border-gray-800 rounded-lg">
                      <TableHeader>
                        <TableRow className="bg-gray-800">
                          <TableHead className="hidden md:table-cell text-sm text-gray-300">ID</TableHead>
                          <TableHead className="text-sm text-gray-300">Email</TableHead>
                          <TableHead className="text-sm text-gray-300">Name</TableHead>
                          <TableHead className="text-sm text-gray-300 w-[200px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user: AppUser) => (
                          <TableRow key={user.id} className="hover:bg-gray-800/70 transition border-b border-gray-800">
                            <TableCell className="hidden md:table-cell text-sm text-gray-100 break-all">{user.id}</TableCell>
                            <TableCell className="text-sm text-gray-100 break-all">{user.email}</TableCell>
                            <TableCell className="text-sm text-gray-100">{user.name || 'N/A'}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 justify-start">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (session?.user?.role !== 'SUPER_ADMIN') return;
                                    router.push(`/admin/users/edit/${user.id}`);
                                  }}
                                  disabled={session?.user?.role !== 'SUPER_ADMIN'}
                                  title={session?.user?.role !== 'SUPER_ADMIN' ? 'Only Super Admin can edit users.' : 'Edit user'}
                                  className="text-primary font-semibold shadow whitespace-nowrap min-w-[80px]"
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
                                    className="shadow whitespace-nowrap min-w-[80px]"
                                  >
                                    Delete
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
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="w-full pt-4 mt-4 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-between relative">
            <div className="w-[100px] sm:w-auto">
              <Button
                className="min-w-[100px] px-4 py-2 text-sm font-medium shadow"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-gray-300 text-sm font-medium whitespace-nowrap">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <div className="w-[100px] sm:w-auto text-right">
              <Button
                className="min-w-[100px] px-4 py-2 text-sm font-medium shadow"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
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
}

export default UserManagementClient;
