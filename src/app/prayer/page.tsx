'use client';

import PageHeader from '@/components/shared/page-header';
import PrayerRequestForm from '@/components/prayer/prayer-request-form';
import PrayerRequestCard from '@/components/prayer/prayer-request-card';
import { Handshake, HeartHandshake } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import SectionTitle from '@/components/shared/section-title';

export interface PrayerRequest {
  id: string;
  name: string; // Can be 'Anonymous'
  requestText: string;
  isPublic: boolean;
  timestamp: Date;
  category?: string; // e.g., Healing, Guidance, Family
}

// Assume these functions interact with your actual database
// Replace these with your actual database interaction logic
const fetchPrayerRequests = async (): Promise<PrayerRequest[]> => {
  // Example: Fetch from an API endpoint
  // const res = await fetch('/api/prayer-requests');
  // if (!res.ok) throw new Error('Failed to fetch prayer requests');
  // return res.json();
  console.log("Simulating fetching prayer requests from database...");
  // In a real app, replace this with actual database fetching
  return Promise.resolve([]); // Return an empty array for now
};

const addPrayerRequestToDatabase = async (request: Omit<PrayerRequest, 'id' | 'timestamp'>): Promise<void> => {
  console.log("Simulating adding prayer request to database:", request);
  // In a real app, replace this with actual database insertion
  return Promise.resolve();
};

export default function PrayerPage() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);

    fetchRequests();

  }, []);

  const fetchRequests = async () => {
    try {
      const fetchedRequests = await fetchPrayerRequests();
      setPrayerRequests(fetchedRequests.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error('Error fetching prayer requests:', error);
    }
  };

  const addPrayerRequest = async (request: Omit<PrayerRequest, 'id' | 'timestamp'>) => {
    try {
      await addPrayerRequestToDatabase(request);
      await fetchRequests(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding prayer request:', error);
    }
  };

  const publicRequests = prayerRequests.filter(req => req.isPublic);

  return (
    <div className="space-y-12">
      <PageHeader
        title="Prayer Wall"
        subtitle="Share your requests and join us in praying for one another."
        icon={HeartHandshake}
      />

      <section>
        <SectionTitle title="Submit Your Prayer Request" />
        <PrayerRequestForm onSubmit={addPrayerRequest} />
      </section>

      <Separator />

      <section>
        <SectionTitle title="Community Prayer Wall" subtitle="Lifting up needs together in faith."/>
        {publicRequests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicRequests.map(request => (
              <PrayerRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No public prayer requests at this time. Be the first to share or check back soon.
          </p>
        )}
      </section>
    </div>
  );
}
