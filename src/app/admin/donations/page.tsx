'use client';

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
  const userRole = session?.user?.role;

  // Sync state from URL params whenever they change
  useEffect(() => {
    setSearchQuery(searchParamsHook?.get('search') ?? '');
    setStatusFilter(searchParamsHook?.get('status') ?? '');
    setCurrentPage(parseInt(searchParamsHook?.get('page') ?? '1'));
  }, [searchParamsHook]);

  useEffect(() => {
    const fetchDonations = async () => {
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
    };
    fetchDonations();
  }, [searchQuery, statusFilter, currentPage, itemsPerPage]);

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

  const totalPages = Math.ceil(totalDonations / itemsPerPage);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
 <h1 className="text-2xl font-semibold">Donation Management</h1>
 <Button asChild>
  <Link href="/admin/donations/create">Create New Donation</Link>
 </Button>
 </div>


      <Input
        placeholder="Search donations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Donor Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Currency</TableHead>
              <TableHead>Donor Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.donorName || 'N/A'}</TableCell>
                <TableCell>{(donation.amount / 100).toFixed(2)}</TableCell> {/* Amount is always visible */}
                <TableCell>{donation.currency ? donation.currency.toUpperCase() : 'N/A'}</TableCell>
                <TableCell>{donation.donorEmail || 'N/A'}</TableCell> {/* Donor Email is always visible */}
                <TableCell>{format(new Date(donation.createdAt), 'PPP')}</TableCell>
                <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setPrayerRequestToDelete(donation.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
