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
  authorName: string | null;
  authorEmail: string | null;
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

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Prayer Request Management</h1>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          {canCreatePrayerRequest && (
            <Button asChild>
              <Link href="/admin/prayer-requests/create">Create New Prayer Request</Link>
            </Button>
          )}
        </div>
        <select
          value={publishedFilter === undefined ? '' : publishedFilter.toString()}
          onChange={(e) => setPublishedFilter(
            e.target.value === '' ? undefined :
            e.target.value === 'true' ? true : false
          )}
          className="border rounded px-2 py-1"
        >
          <option value="">All Visibility</option>
          <option value="true">Published</option>
          <option value="false">Not Published</option>
        </select>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : prayerRequests.length === 0 ? (
        <p>No prayer requests found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author Name</TableHead>
              <TableHead>Category</TableHead>
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
                <TableCell>{request.category || 'N/A'}</TableCell>
                <TableCell>{request.published ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/prayer-requests/view/${request.id}`}>View</Link>
                    </Button>
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
