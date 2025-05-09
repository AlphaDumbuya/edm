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

const initialRequests: PrayerRequest[] = [
  { id: '1', name: 'Anonymous', requestText: 'Please pray for healing for my mother who is unwell.', isPublic: true, timestamp: new Date(Date.now() - 86400000 * 2), category: 'Healing' },
  { id: '2', name: 'Sarah P.', requestText: 'Praying for guidance as I make a major career decision.', isPublic: true, timestamp: new Date(Date.now() - 86400000), category: 'Guidance' },
  { id: '3', name: 'Anonymous', requestText: 'For peace and comfort for a grieving family in our community.', isPublic: true, timestamp: new Date(), category: 'Comfort' },
];

export default function PrayerPage() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  
  useEffect(() => {
    // In a real app, fetch from a database. For now, use initial requests.
    // Add a delay to simulate fetching
    const timer = setTimeout(() => {
      setPrayerRequests(initialRequests.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const addPrayerRequest = (request: Omit<PrayerRequest, 'id' | 'timestamp'>) => {
    const newRequest: PrayerRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setPrayerRequests(prevRequests => [newRequest, ...prevRequests].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
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
