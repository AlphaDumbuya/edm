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
  category: string | null;
  authorName: string | null;
  authorEmail: string | null;
}

function PrayerRequestsContent(): React.ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const userRole = session?.user?.role;
  const canManagePrayerRequests = hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
  const canCreatePrayerRequest = canManagePrayerRequests;

  // Add container styles
  const containerStyle = "min-h-screen bg-gray-950 text-white p-4 md:p-6 lg:p-8";

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

  // Refresh is handled by the handleRefresh function defined above

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col relative">
      <div className="flex-grow w-full mx-auto">
        <div className="max-w-[1920px] w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-800/60">
            <div className="flex items-center gap-3">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-gray-200">
                Prayer Requests
              </h1>
              <div className="h-4 w-px bg-gray-800/60 hidden sm:block" />
              <span className="hidden sm:block text-xs text-gray-400 font-medium">
                Manage prayer request entries
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center justify-center gap-1.5 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 h-7 sm:h-8 px-2 sm:px-2.5 text-xs font-medium min-w-[70px] transition-colors"
              >
                <div className={`w-3 h-3 border-2 border-current border-t-transparent rounded-full ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              {canCreatePrayerRequest && (
                <Button 
                  asChild 
                  variant="default"
                  className="flex items-center justify-center h-7 sm:h-8 px-2 sm:px-2.5 text-xs font-medium min-w-[70px] transition-colors"
                >
                  <Link href="/admin/prayer-requests/create">
                    <span>Add New</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        
        {error ? (
          <div className="rounded-lg bg-red-950/50 border border-red-800/50 p-4 sm:p-5 text-sm sm:text-base text-red-200 shadow-lg backdrop-blur-sm">
            {error}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center p-6 sm:p-8 min-h-[200px]">
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : prayerRequests.length === 0 ? (
          <div className="text-center p-6 sm:p-8 rounded-lg bg-gray-900/50 border border-gray-800/50 shadow-lg backdrop-blur-sm">
            <p className="text-gray-400 text-sm sm:text-base">No prayer requests found.</p>
          </div>
        ) : (
          <>
            {/* Responsive card grid layout for mobile and tablet */}
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-2 lg:hidden gap-3 sm:gap-4">
              {prayerRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="group bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800/50 p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5 lg:gap-6 h-full transition-all duration-200 hover:border-gray-700/70 hover:bg-gray-900/60 hover:scale-[1.01] hover:shadow-xl"
                >
                  <div className="font-semibold text-base sm:text-lg lg:text-xl text-white/90 line-clamp-2 leading-tight group-hover:text-white">
                    {request.title}
                  </div>
                  <div className="space-y-4 sm:space-y-5 flex-grow">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <span className="font-medium text-white/80 text-xs sm:text-sm lg:text-base">Author</span>
                      <span className="text-gray-300/90 text-sm sm:text-base break-words">
                        {request.authorName || 'Anonymous'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <span className="font-medium text-white/80 text-xs sm:text-sm lg:text-base">Status</span>
                      <span className={`
                        ${request.published ? 'text-green-400/90' : 'text-yellow-400/90'} 
                        text-sm sm:text-base font-medium
                        ${request.published ? 'group-hover:text-green-400' : 'group-hover:text-yellow-400'}
                      `}>
                        {request.published ? 'Published' : 'Unpublished'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <span className="font-medium text-white/80 text-xs sm:text-sm lg:text-base">Date</span>
                      <span className="text-gray-300/90 text-sm sm:text-base">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {canManagePrayerRequests && (
                    <div className="flex gap-2 mt-auto pt-3 sm:pt-4">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteClick(request.id)}
                        className="w-full h-8 sm:h-9 lg:h-10 text-xs sm:text-sm lg:text-base font-medium transition-all duration-200 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Responsive Table layout */}
            <div className="hidden lg:block mt-6 sm:mt-8">
              <div className="rounded-lg border border-gray-800/50 shadow-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <Table className="w-full min-w-[700px]">
                    <TableHeader>
                      <TableRow className="border-b border-gray-800/50 bg-gray-900/30">
                        <TableHead className="py-3 px-3 md:py-4 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Title</TableHead>
                        <TableHead className="py-3 px-3 md:py-4 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Author Name</TableHead>
                        <TableHead className="py-3 px-3 md:py-4 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Published</TableHead>
                        <TableHead className="py-3 px-3 md:py-4 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Created At</TableHead>
                        <TableHead className="py-3 px-3 md:py-4 md:px-4 text-gray-300 font-semibold text-xs md:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prayerRequests.map((request) => (
                        <TableRow 
                          key={request.id}
                          className="border-b border-gray-800/30 transition-all duration-200 hover:bg-gray-900/40 group"
                        >
                          <TableCell className="py-4 px-4 font-medium text-white/90 text-sm lg:text-base group-hover:text-white">
                            {request.title}
                          </TableCell>
                          <TableCell className="py-4 px-4 text-gray-300/90 text-sm lg:text-base">
                            {request.authorName || 'Anonymous'}
                          </TableCell>
                          <TableCell className="py-4 px-4 text-sm lg:text-base">
                            <span className={`
                              ${request.published ? 'text-green-400/90' : 'text-yellow-400/90'} 
                              font-medium
                              ${request.published ? 'group-hover:text-green-400' : 'group-hover:text-yellow-400'}
                            `}>
                              {request.published ? 'Published' : 'Unpublished'}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-4 text-gray-300/90 text-sm lg:text-base">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="py-4 px-4">
                            {canManagePrayerRequests && (
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteClick(request.id)}
                                className="h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98]"
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
            </div>
          </>
        )}

        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-lg sm:text-xl font-semibold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base text-gray-400">
              This action cannot be undone. This will permanently delete the prayer request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3 sm:gap-4">
            <AlertDialogCancel className="flex-1 h-9 sm:h-10 text-sm sm:text-base font-medium">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (prayerRequestToDelete) {
                  await deletePrayerRequestAction(prayerRequestToDelete);
                  setIsDeleteDialogOpen(false);
                  setPrayerRequestToDelete(null);
                  router.refresh();
                }
              }}
              className="flex-1 h-9 sm:h-10 bg-red-600 text-sm sm:text-base font-medium hover:bg-red-700 transition-colors"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function PrayerRequestsPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-gray-950 text-white p-4 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PrayerRequestsContent />
    </React.Suspense>
  );
}
