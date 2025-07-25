'use client';

import { AppUser } from '@/lib/db/users';
import { getAllUsersAction } from './actions';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

export const UserManagementClient: React.FC<UserManagementClientProps> = ({
  initialUsers = [],
  initialTotalCount = 0,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams() || new URLSearchParams();

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

  // Initial fetch and URL sync effect
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
  }, []); // Empty dependency array - only run once on mount

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
      await deleteUserAction(selectedUserId);
      // Refresh the current page
      await fetchUsers(searchQuery, roleFilter, currentPage, usersPerPage, true);
      setShowDeleteDialog(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }, [selectedUserId, searchQuery, roleFilter, currentPage, usersPerPage, fetchUsers]);

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
            <SelectItem value="EDITOR">Editor</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="VIEWER">Viewer</SelectItem>
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
