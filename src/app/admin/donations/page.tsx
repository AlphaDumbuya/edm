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
 createdAt: string; // Assuming createdAt is returned as a string
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

  const { data: session } = useSession();
  const role = session?.user?.role || "VIEWER";


  // Refetch donations list
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

  // Manual refresh handler
  const handleRefresh = () => {
    fetchDonations();
  };

  // Sync state from URL params whenever they change
  useEffect(() => {
    setSearchQuery(searchParamsHook?.get('search') ?? '');
    setStatusFilter(searchParamsHook?.get('status') ?? '');
    setCurrentPage(parseInt(searchParamsHook?.get('page') ?? '1'));
  }, [searchParamsHook]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  // Update URL params when state changes, but only if different
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
    // Only push if params actually changed
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
    <div className="flex flex-col gap-4 p-2 sm:p-6 lg:p-8 w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0 w-full">
        <h1 className="text-2xl font-semibold mt-4 mb-6 sm:mt-6 sm:mb-8">Donation Management</h1>
        <div className="flex flex-row justify-between gap-2 w-full sm:w-auto sm:justify-end">
          <RestrictedButton
            allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EDITOR']}
            userRole={role}
            onClick={() => {
              if (role === 'VIEWER') return;
              router.push('/admin/donations/create');
            }}
            title={role === 'VIEWER' ? 'Viewers cannot create donations.' : undefined}
            className="w-auto order-1 sm:order-none"
          >
            <span className="block sm:hidden">New Donation</span>
            <span className="hidden sm:inline">Create New Donation</span>
          </RestrictedButton>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow w-auto justify-center order-2 sm:order-none"
            onClick={handleRefresh}
            title="Refresh donations list"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581m-2.638 2.638A7.974 7.974 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657-.507-3.197-1.382-4.462m2.638-2.638A7.974 7.974 0 0112 4c4.418 0 8 3.582 8 8 0 1.657-.507-3.197-1.382 4.462" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Donations Table */}
      {donations.length > 0 && (
        <div className="w-full">
          {/* Mobile: Card layout */}
          <div className="flex flex-col gap-3 sm:hidden max-w-full w-full mx-auto">
            {donations.map((donation) => (
              <div key={donation.id} className="bg-dark rounded-lg shadow border border-border p-3 flex flex-col text-xs max-w-[340px] w-full break-words overflow-hidden mx-auto text-white">
                <div className="font-semibold text-white mb-1">Donation</div>
                <div className="break-words"><span className="font-medium text-white">ID:</span> <span className="break-all text-white/80">{donation.id}</span></div>
                <div><span className="font-medium text-white">Amount:</span> <span className="text-white/80">{donation.amount}</span></div>
                <div><span className="font-medium text-white">Currency:</span> <span className="text-white/80">{donation.currency}</span></div>
                <div className="break-words"><span className="font-medium text-white">Donor Email:</span> <span className="break-all text-white/80">{donation.donorEmail}</span></div>
                <div><span className="font-medium text-white">Created At:</span> <span className="text-white/80">{format(new Date(donation.createdAt), 'yyyy-MM-dd HH:mm')}</span></div>
                <div className="mt-2 flex gap-2">
                  <RestrictedButton
                    allowedRoles={['ADMIN', 'SUPER_ADMIN', 'EDITOR']}
                    userRole={role}
                    onClick={() => handleDelete(donation.id)}
                    className="px-2 py-1 text-[10px] whitespace-nowrap"
                    title={role === "VIEWER" ? "Viewers cannot delete donations." : undefined}
                  >
                    Delete
                  </RestrictedButton>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: Table layout */}
          <Table className="w-full overflow-x-auto hidden sm:table bg-dark text-white">
            <TableHeader>
              <TableRow className="text-xs sm:text-sm">
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Donor Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id} className="text-xs sm:text-sm">
                  <TableCell>{donation.id}</TableCell>
                  <TableCell>{donation.amount}</TableCell>
                  <TableCell>{donation.currency}</TableCell>
                  <TableCell>{donation.donorEmail}</TableCell>
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
      )}

      {/* Pagination can go here */}

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
