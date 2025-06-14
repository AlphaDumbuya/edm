'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDonationById } from "@/lib/db/donations";
import { Donation } from '@prisma/client';

export default function DonationDetailsPage() {
  const params = useParams();
  const donationId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDonation() {
      if (!donationId) {
        setLoading(false);
        setError("Donation ID is missing.");
        return;
      }
      try {
        const fetchedDonation = await getDonationById(donationId);
        if (fetchedDonation) {
          setDonation(fetchedDonation);
        } else {
          setError("Donation not found.");
        }
      } catch (err) {
        console.error("Error fetching donation:", err);
        setError("Failed to fetch donation.");
      } finally {
        setLoading(false);
      }
    }
    fetchDonation();
  }, [donationId]);

  if (loading) {
    return <div>Loading donation details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!donation) {
    return <div>Donation not found.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Donation Details: {donation.id}</h1>git

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Donor Name:</p>
          <p>{donation.donorName || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Donor Email:</p>
          <p>{donation.donorEmail || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Amount:</p>
          <p>${donation.amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
          <p>{donation.date.toDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Payment Method:</p>
          <p>{donation.paymentMethod}</p>
        </div>
        <div>
          <p className="font-semibold">Campaign/Fund:</p>
          <p>{donation.campaign || 'N/A'}</p>
        </div>
        <div>
          <p className="font-semibold">Created At:</p>
          <p>{donation.createdAt.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Updated At:</p>
          <p>{donation.updatedAt.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}