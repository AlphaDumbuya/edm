'use client';
import { getAllPrayerRequests, deletePrayerRequest } from "@/lib/db/prayerRequests";
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
import { useState, useEffect } from "react";
import { deletePrayerRequestAction } from "./actions";
import { useSession } from 'next-auth/react';
import { hasRole } from '@/lib/utils';
import { useRouter } from "next/navigation";
interface PrayerRequest {
  id: string;
  title: string;
  authorName: string | null;
  body: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  // Add any other properties that exist on a prayer request object
}

export default function PrayerRequestsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter();
  const [totalPrayerRequests, setTotalPrayerRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [searchQuery, setSearchQuery] = useState<string>(searchParams?.search as string || '');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams?.status as string || '');
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams?.page as string || '1'));
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Or any default you prefer

  const [prayerRequestToDelete, setPrayerRequestToDelete] = useState<string | null>(null); // Moved declaration here

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]); // Typed as PrayerRequest[]
  const handleDeleteClick = (prayerRequestId: string) => {
    setPrayerRequestToDelete(prayerRequestId);
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    const fetchPrayerRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const { prayerRequests, totalCount } = await getAllPrayerRequests({
          search: searchQuery,
          status: statusFilter,
          offset,
          limit: itemsPerPage,
          orderBy: { createdAt: 'desc' },
        });
        setPrayerRequests(prayerRequests); // Removed as any cast
        setTotalPrayerRequests(totalCount);
      } catch (e) {
        console.error("Failed to fetch prayer requests:", e);
        setError("Failed to fetch prayer requests.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrayerRequests();
  }, [searchQuery, statusFilter, currentPage, itemsPerPage]);

  useEffect(() => {
    const params = new URLSearchParams();
    // Iterate over searchParams to construct URLSearchParams
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined) { // Only add parameters with defined values
          if (Array.isArray(value)) {
            value.forEach(val => params.append(key, val));
          } else {
            params.set(key, value);
          }
        }
      });
    }

    if (searchQuery) params.set('search', searchQuery); else params.delete('search');
    if (statusFilter) params.set('status', statusFilter); else params.delete('status');
    params.set('page', currentPage.toString());
    // Assuming itemsPerPage is constant for now, you might add it to params if needed
    router.push(`?${params.toString()}`); // Use replace instead of push to avoid excessive history entries
  }, [searchQuery, statusFilter, currentPage, itemsPerPage, router, searchParams]); // searchParams in dependency array

  const { data: session } = useSession();
  const userRole = session?.user?.role; // Assuming role is available in session.user.role

  const canManagePrayerRequests = hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
  const canCreatePrayerRequest = hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']); // Defined canCreatePrayerRequest


  return (
    <div>
 <h1 className="text-2xl font-semibold mb-4">Prayer Request Management</h1>

 {canCreatePrayerRequest && (
 <Button asChild className="mb-4">
 <Link href="/admin/prayer-requests/create">Create New Prayer Request</Link>
 </Button>
 )} {/* Corrected closing tag */}

      {/* Search and Filter Controls */}
      {/* Pagination Controls */}

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
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prayerRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.authorName}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.createdAt.toDateString()}</TableCell>
                <TableCell>
 <div className="flex space-x-2">
                    {/* Always allow viewing */}
 <Button variant="outline" size="sm" asChild>
 <Link href={`/admin/prayer-requests/view/${request.id}`}>View</Link>
 </Button>

                    {/* Conditionally render Edit and Delete buttons */}
                    {canManagePrayerRequests && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(request.id)}
                      >
 Delete
                      </Button>
 )}{/* Added closing parenthesis here */}
 </div>
 </TableCell> {/* Added closing tag for TableCell */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination Controls */}
      {/* You'll need to add buttons/logic here to change currentPage */}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the prayer request.\n
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (prayerRequestToDelete) {
                await deletePrayerRequestAction(prayerRequestToDelete);
                router.refresh(); // Refresh the page to show the updated list
              }
            }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
