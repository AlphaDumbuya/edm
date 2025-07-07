'use client';

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { hasRole } from '@/lib/utils';

interface PrayerRequest {
  id: string;
  title: string;
  authorName: string | null;
  body: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function PrayerRequestsContent() {
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

  const [searchQuery, setSearchQuery] = useState<string>(searchParams?.get('search') ?? '');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams?.get('status') ?? '');
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams?.get('page') ?? '1', 10));
  const [itemsPerPage] = useState<number>(10);

  const [prayerRequestToDelete, setPrayerRequestToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (prayerRequestId: string) => {
    setPrayerRequestToDelete(prayerRequestId);
    setIsDeleteDialogOpen(true);
  };

  // Fetch prayer requests
  useEffect(() => {
    const fetchPrayerRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const result = await getAllPrayerRequestsAction({
          search: searchQuery,
          status: statusFilter,
          offset,
          limit: itemsPerPage,
          orderBy: { createdAt: 'desc' },
        });

        if (result.success && result.data) {
 setPrayerRequests(result.data.prayerRequests);
 setTotalPrayerRequests(result.data.totalCount);
 } else {
 setError(result.error || 'An unknown error occurred during fetching.');
 }
      } catch (err) {
        setError("Failed to fetch prayer requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerRequests();
  }, [searchQuery, statusFilter, currentPage, itemsPerPage]);

  // Sync URL query params with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (statusFilter) params.set('status', statusFilter);
    params.set('page', currentPage.toString());
    router.push(`?${params.toString()}`);
  }, [searchQuery, statusFilter, currentPage, router]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Prayer Request Management</h1>

      {canCreatePrayerRequest && (
        <Button asChild className="mb-4">
          <Link href="/admin/prayer-requests/create">Create New Prayer Request</Link>
        </Button>
      )}

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
                    {/* <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/prayer-requests/view/${request.id}`}>View</Link>
                    </Button> */}
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
