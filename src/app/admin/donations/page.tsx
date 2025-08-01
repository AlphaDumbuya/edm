'use client';

import React from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { RefreshCw } from 'lucide-react';
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
import { TableBody, TableCell } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import RestrictedButton from '@/components/admin/RestrictedButton';

interface Donation {
 id: string;
 amount: number;
 currency: string;
 donorEmail: string | null;
 createdAt: string;
}

interface DonationsApiResponse {
 donations: Donation[];
 totalCount: number;
}

function DonationsContent() {
  const searchParamsHook = useSearchParams();
  const router = useRouter();

  const [donations, setDonations] = useState<any[]>([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [prayerRequestToDelete, setPrayerRequestToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: session } = useSession();
  const role = session?.user?.role || "VIEWER";

  const fetchDonations = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const params = new URLSearchParams({
        search: searchQuery,
        status: statusFilter,
        offset: offset.toString(),
        limit: itemsPerPage.toString(),
        orderBy: 'createdAt:desc',
      });
      const response = await fetch(`/api/admin/donations?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: DonationsApiResponse = await response.json();
      setDonations(data.donations);
      setTotalDonations(data.totalCount);
    } catch (e) {
      console.error("Failed to fetch donations:", e);
      setError("Failed to fetch donations.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, currentPage, itemsPerPage]);

  const handleRefresh = () => {
    fetchDonations();
  };

  useEffect(() => {
    setSearchQuery(searchParamsHook?.get('search') ?? '');
    setStatusFilter(searchParamsHook?.get('status') ?? '');
    setCurrentPage(parseInt(searchParamsHook?.get('page') ?? '1'));
  }, [searchParamsHook]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsHook?.toString() ?? '');
    let changed = false;
    if (searchQuery) {
      if (params.get('search') !== searchQuery) {
        params.set('search', searchQuery);
        changed = true;
      }
    } else if (params.has('search')) {
      params.delete('search');
      changed = true;
    }
    if (statusFilter) {
      if (params.get('status') !== statusFilter) {
        params.set('status', statusFilter);
        changed = true;
      }
    } else if (params.has('status')) {
      params.delete('status');
      changed = true;
    }
    if (params.get('page') !== currentPage.toString()) {
      params.set('page', currentPage.toString());
      changed = true;
    }
    if (changed) {
      router.push(`?${params.toString()}`);
    }
  }, [searchQuery, statusFilter, currentPage, itemsPerPage, searchParamsHook, router]);

  const handleDelete = (id: string) => {
    if (role === 'VIEWER') return;
    setPrayerRequestToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const totalPages = Math.ceil(totalDonations / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Donation Management</h1>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <RestrictedButton
              allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EDITOR']}
              userRole={role}
              onClick={() => {
                if (role === 'VIEWER') return;
                router.push('/admin/donations/create');
              }}
              title={role === 'VIEWER' ? 'Viewers cannot create donations.' : undefined}
              className="flex-1 md:flex-none justify-center text-base py-2.5 px-4 min-w-[120px]"
            >
              <span className="block md:hidden">New Donation</span>
              <span className="hidden md:inline">Create New Donation</span>
            </RestrictedButton>
            <Button
              variant="secondary"
              size="default"
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white flex-1 md:flex-none justify-center text-base py-2.5 px-4 min-w-[120px]"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg bg-red-950/50 border border-red-800 p-4 text-red-200">
            {error}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center p-8">
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center p-8 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-gray-400">No donations found.</p>
          </div>
        ) : (
          <>
            {/* Mobile and tablet: Card layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
              {donations.map((donation) => (
                <div 
                  key={donation.id} 
                  className="bg-gray-900/50 rounded-lg shadow-sm border border-gray-800 p-6 flex flex-col gap-6"
                >
                  <div className="font-semibold text-xl md:text-2xl text-white">Donation Details</div>
                  <div className="space-y-4 text-base">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">ID</span>
                      <span className="break-all text-gray-300">{donation.id}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">Amount</span>
                      <span className="text-gray-300">{donation.amount}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">Currency</span>
                      <span className="text-gray-300">{donation.currency || '-'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">Donor Email</span>
                      <span className="break-all text-gray-300">{donation.donorEmail}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-white">Created At</span>
                      <span className="text-gray-300">
                        {format(new Date(donation.createdAt), 'yyyy-MM-dd HH:mm')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto pt-4">
                    <RestrictedButton
                      allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EDITOR']}
                      userRole={role}
                      onClick={() => handleDelete(donation.id)}
                      className="w-full text-base py-3 px-4"
                      title={role === "VIEWER" ? "Viewers cannot delete donations." : undefined}
                    >
                      Delete
                    </RestrictedButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table layout */}
            <div className="hidden lg:block overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg border border-gray-800">
                  <Table className="w-full bg-gray-900/50 text-white">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">ID</TableHead>
                        <TableHead className="text-gray-300">Amount</TableHead>
                        <TableHead className="text-gray-300">Currency</TableHead>
                        <TableHead className="text-gray-300">Donor Email</TableHead>
                        <TableHead className="text-gray-300">Created At</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-medium break-all">{donation.id}</TableCell>
                          <TableCell>{donation.amount}</TableCell>
                          <TableCell>{donation.currency}</TableCell>
                          <TableCell className="break-all">{donation.donorEmail}</TableCell>
                          <TableCell>{format(new Date(donation.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                          <TableCell>
                            <RestrictedButton
                              allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EDITOR']}
                              userRole={role}
                              onClick={() => handleDelete(donation.id)}
                              className="ml-2"
                              title={role === "VIEWER" ? "Viewers cannot delete donations." : undefined}
                            >
                              Delete
                            </RestrictedButton>
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

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (prayerRequestToDelete) {
                    setLoading(true);
                    setError(null);
                    try {
                      const response = await fetch(`/api/admin/donations/${prayerRequestToDelete}`, {
                        method: 'DELETE',
                      });
                      if (!response.ok) {
                        const data = await response.json();
                        setError(data.error || 'Failed to delete donation.');
                      } else {
                        setDonations((prev) => prev.filter((d) => d.id !== prayerRequestToDelete));
                        setIsDeleteDialogOpen(false);
                        setPrayerRequestToDelete(null);
                      }
                    } catch (err) {
                      setError('Failed to delete donation.');
                    } finally {
                      setLoading(false);
                    }
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

import { Suspense } from 'react';

export default function DonationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationsContent />
    </Suspense>
  );
}
