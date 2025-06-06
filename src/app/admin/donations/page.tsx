'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/utils';
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

  console.log(session);

  useEffect(() => {
    if (typeof window === 'undefined') {
      // Only run this effect on the client side
      return;
    }
    setSearchQuery(searchParamsHook.get('search') || '');
    setStatusFilter(searchParamsHook.get('status') || '');
    setCurrentPage(parseInt(searchParamsHook.get('page') || '1'));

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
 orderBy: 'createdAt:desc', // Assuming your API route can parse this
        });

        const response = await fetch(`/admin/donations/api?${params.toString()}`);

        if (!response.ok) {
 throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDonations(data.donations);
        const { donations: fetchedDonations, totalCount } = data;

        setTotalDonations(totalCount);
      } catch (e) {
        console.error("Failed to fetch donations:", e);
        setError("Failed to fetch donations.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [searchQuery, statusFilter, currentPage, itemsPerPage]);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsHook.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    if (statusFilter) {
      params.set('status', statusFilter);
    } else {
      params.delete('status');
    }
    params.set('page', currentPage.toString());
    router.push(`?${params.toString()}`);
  }, [searchQuery, statusFilter, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalDonations / itemsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Donation Management</h1>

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
              <TableHead>ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Donor Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.id}</TableCell>
                <TableCell>{(donation.amount / 100).toFixed(2)}</TableCell>
                <TableCell>{donation.currency.toUpperCase()}</TableCell>
                <TableCell>{donation.donorEmail || 'N/A'}</TableCell>
                <TableCell>{format(new Date(donation.createdAt), 'PPP')}</TableCell>
                <TableCell>
                  {userRole && hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/donations/view/${donation.id}`}>View</Link>
                      </Button>
                    </div>
                  )}
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
                // Implement delete functionality here when ready
                // if (prayerRequestToDelete) {
                //   await deleteDonationAction(prayerRequestToDelete);
                // }
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
