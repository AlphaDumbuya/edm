'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/shared/page-header';
import PrayerRequestForm from '@/components/prayer/prayer-request-form';
import PrayerRequestCard from '@/components/prayer/prayer-request-card';
import { HeartHandshake } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SectionTitle from '@/components/shared/section-title';
import { getAllPrayerRequests, createPrayerRequest } from '@/lib/db/prayerRequests';

// Corrected interface for PrayerRequest
export interface PrayerRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  body: string;
  authorName: string | null;
  authorEmail: string | null;
  status: string;
}

export default function PrayerPage() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/prayerRequests');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const requests = data.prayerRequests as PrayerRequest[];
      const publicRequests = requests.filter(
        (request) => request.status === 'public'
      );
      setPrayerRequests(
        publicRequests.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (err: any) {
      console.error('Error fetching prayer requests:', err);
      setError('Failed to load prayer requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const addPrayerRequest = async (
    request: Omit<PrayerRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ) => {
    try {
      const requestDataForDb = {
        ...request,
        authorName:
          request.authorName === null ? undefined : request.authorName,
        authorEmail:
          request.authorEmail === null ? undefined : request.authorEmail,
        status: 'pending',
      };
      await createPrayerRequest(requestDataForDb);
      fetchRequests();
    } catch (error) {
      console.error('Error submitting prayer request:', error);
    }
  };

  return (
    <div className="container py-8">
      <PageHeader
        title="Prayer Wall"
        subtitle="Submit a prayer request or pray for others in need."
        icon={HeartHandshake}
      />

      <PrayerRequestForm onSubmit={addPrayerRequest} />
      <Separator className="my-6" />

      <SectionTitle title="Prayer Requests" />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : prayerRequests.length === 0 ? (
        <p>No public prayer requests available.</p>
      ) : (
        prayerRequests.map((request) => (
          <PrayerRequestCard key={request.id} request={request} />
        ))
      )}
    </div>
  );
}
