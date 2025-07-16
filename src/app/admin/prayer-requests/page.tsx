'use client';

import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react';

import {
  deletePrayerRequestAction,
  getAllPrayerRequestsAction,
} from "./actions";
import { GetAllPrayerRequestsOptions } from "@/lib/db/prayerRequests";
import { hasRole } from '@/lib/utils';

interface PrayerRequest {
  id: string;
  title: string;
  body: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  category: string | null;
}

function PrayerRequestsContent(): React.ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const userRole = session?.user?.role;
  const canManagePrayerRequests = hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
  const canCreatePrayerRequest = canManagePrayerRequests;

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [totalPrayerRequests, setTotalPrayerRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>(searchParams?.get('search') ?? '');
  const [publishedFilter, setPublishedFilter] = useState<boolean | undefined>(
    searchParams?.get('published') === 'true' ? true :
    searchParams?.get('published') === 'false' ? false :
    undefined
  );
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams?.get('page') ?? '1', 10));
  const [itemsPerPage] = useState<number>(10);

  const [prayerRequestToDelete, setPrayerRequestToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchPrayerRequests();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeleteClick = (prayerRequestId: string) => {
    setPrayerRequestToDelete(prayerRequestId);
    setIsDeleteDialogOpen(true);
  };

  const fetchPrayerRequests = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const options: GetAllPrayerRequestsOptions = {
        search: searchTerm,
        published: publishedFilter,
        offset,
        limit: itemsPerPage,
        orderBy: { createdAt: 'desc' },
      };
      const result = await getAllPrayerRequestsAction(options);

      if (result.success && result.data) {
        setPrayerRequests(result.data.prayerRequests);
        setTotalPrayerRequests(result.data.totalCount);
        return true;
      } else {
        setError(result.error || 'An unknown error occurred during fetching.');
        return false;
      }
    } catch (err) {
      setError("Failed to fetch prayer requests.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [searchTerm, publishedFilter, currentPage, itemsPerPage]);

  // Fetch prayer requests when dependencies change
  useEffect(() => {
    fetchPrayerRequests();
  }, [fetchPrayerRequests]);

  // Sync URL query params with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (publishedFilter !== undefined) params.set('published', publishedFilter.toString());
    params.set('page', currentPage.toString());
    router.push(`?${params.toString()}`);
  }, [searchTerm, publishedFilter, currentPage, router]);

  // Refresh handler
  const handleRefresh = () => {
    setLoading(true);
    getAllPrayerRequestsAction({
      search: searchQuery,
      status: statusFilter,
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
      orderBy: { createdAt: 'desc' },
    }).then(result => {
      if (result.success && result.data) {
        setPrayerRequests(result.data.prayerRequests);
        setTotalPrayerRequests(result.data.totalCount);
      } else {
        setError(result.error || 'An unknown error occurred during fetching.');
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 w-full">
        <h1 className="text-2xl font-semibold text-center sm:text-left py-4 sm:py-6">Prayer Request Management</h1>
        <div className="flex flex-row justify-between gap-2 items-center sm:justify-end w-full sm:w-auto">
          {canCreatePrayerRequest && (
            <Button asChild className="w-auto order-1 sm:order-none">
              <Link href="/admin/prayer-requests/create">
                <span className="block sm:hidden">New Request</span>
                <span className="hidden sm:inline">Create New Prayer Request</span>
              </Link>
            </Button>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow w-auto order-2 sm:order-none"
            onClick={handleRefresh}
            title="Refresh prayer requests list"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581m-2.638 2.638A7.974 7.974 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657-.507-3.197-1.382-4.462m2.638-2.638A7.974 7.974 0 0112 4c4.418 0 8 3.582 8 8 0 1.657-.507-3.197-1.382-4.462" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : prayerRequests.length === 0 ? (
        <p>No prayer requests found.</p>
      ) : (
        <>
          {/* Mobile: Card layout */}
          <div className="flex flex-col gap-3 sm:hidden max-w-full w-full mx-auto">
            {prayerRequests.map((request) => (
              <div key={request.id} className="bg-dark rounded-lg shadow border border-border p-3 flex flex-col text-xs max-w-[340px] w-full break-words overflow-hidden mx-auto text-white">
                <div className="font-semibold text-white mb-1">{request.title}</div>
                <div><span className="font-medium text-white">Author:</span> <span className="text-white/80">{request.authorName || 'N/A'}</span></div>
                <div><span className="font-medium text-white">Status:</span> <span className="text-white/80">{request.published ? 'Published' : 'Unpublished'}</span></div>
                <div><span className="font-medium text-white">Created At:</span> <span className="text-white/80">{new Date(request.createdAt).toLocaleDateString()}</span></div>
                <div className="mt-2 flex gap-2">
                  {canManagePrayerRequests && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(request.id)}
                      className="px-2 py-1 text-[10px] whitespace-nowrap"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: Table layout */}
          <Table className="w-full overflow-x-auto hidden sm:table bg-dark text-white">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author Name</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prayerRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.authorName}</TableCell>
                  <TableCell>{request.published ? 'Published' : 'Unpublished'}</TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {canManagePrayerRequests && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(request.id)}
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
        </>
      )}

      {/* Pagination Controls (implement actual logic/buttons for navigation here) */}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the prayer request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (prayerRequestToDelete) {
                  await deletePrayerRequestAction(prayerRequestToDelete);
                  setIsDeleteDialogOpen(false);
                  setPrayerRequestToDelete(null);
                  router.refresh(); // Refresh data
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { Suspense } from 'react';

export default function PrayerRequestsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrayerRequestsContent />
    </Suspense>
  );
}
