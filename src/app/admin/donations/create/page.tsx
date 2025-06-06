"use client";
'use client';
import { getAllDonations } from "@/lib/db/donations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow

} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DonationsPage() {
  let donations = [];
  let error = null;

  try {
    donations = await getAllDonations();
  } catch (e: any) {
    error = e.message;
    console.error("Error fetching donations:", e);
    donations = []; // Ensure donations is an empty array on error
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Donation Tracking</h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      {!error && donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor Name</TableHead>
                <TableHead>Donor Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.donorName}</TableCell>
                  <TableCell>{donation.donorEmail}</TableCell>
                  <TableCell>${donation.amount.toFixed(2)}</TableCell>
                  <TableCell>{donation.date.toDateString()}</TableCell>
                  <TableCell>{donation.paymentMethod}</TableCell>
                  <TableCell>{donation.campaign}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/donations/view/${donation.id}`}>View</Link>
                      </Button>
                      <Button variant="destructive" size="sm">Delete</Button> {/* Placeholder */}


 </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
}