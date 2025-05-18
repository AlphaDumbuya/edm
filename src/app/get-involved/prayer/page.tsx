
'use client';

import PageHeader from '@/components/shared/page-header';
import PrayerRequestForm from '@/components/prayer/prayer-request-form';
import PrayerRequestCard from '@/components/prayer/prayer-request-card';
import { HeartHandshake } from 'lucide-react'; // Changed from Handshake
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import SectionTitle from '@/components/shared/section-title';
import Image from 'next/image';

export interface PrayerRequest {
  id: string;
  name: string; // Can be 'Anonymous'
  requestText: string;
  isPublic: boolean;
  timestamp: Date;
  category?: string; // e.g., Healing, Guidance, Family
}

const initialRequests: PrayerRequest[] = [
  { id: '1', name: 'Anonymous', requestText: 'Please pray for healing for my mother who is unwell in Freetown.', isPublic: true, timestamp: new Date(Date.now() - 86400000 * 2), category: 'Healing' },
  { id: '2', name: 'Sarah P. (Ohio Partner)', requestText: 'Praying for guidance for EDM\'s leadership as they make strategic decisions.', isPublic: true, timestamp: new Date(Date.now() - 86400000), category: 'Guidance' },
  { id: '3', name: 'Anonymous', requestText: 'For peace and provision for families affected by recent flooding in Sierra Leone.', isPublic: true, timestamp: new Date(), category: 'Comfort' },
  { id: '4', name: 'John B.', requestText: 'Pray for successful customs clearance of the van and equipment for EDM Sierra Leone.', isPublic: true, timestamp: new Date(Date.now() - 3600000 * 5), category: 'EDM Projects' },
];

export default function PrayerPage() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  
  useEffect(() => {
    // In a real app, fetch from a database. For now, use initial requests.
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
        title="EDM Prayer Wall"
        subtitle="Share your requests and join us in praying for one another, our mission in Sierra Leone, and our Ohio partners."
        icon={HeartHandshake}
      />
      
      <section className="grid md:grid-cols-2 gap-12 items-center">
         <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://placehold.co/600x400.png"
            alt="People praying together"
            layout="fill"
            objectFit="cover"
            data-ai-hint="prayer hands group"
          />
        </div>
        <div>
          <SectionTitle title="The Power of Prayer" />
          <p className="text-lg text-muted-foreground mb-4">
            Prayer is foundational to all that EDM does. We believe in a God who hears and answers prayer, and we rely on His guidance, provision, and power to fulfill our mission in Sierra Leone and support our partnerships in Ohio.
          </p>
          <p className="text-lg text-muted-foreground">
            Your prayers are a vital part of this ministry. Join us by submitting your own requests or by lifting up the needs shared by others.
          </p>
        </div>
      </section>


      <section>
        <SectionTitle title="Submit Your Prayer Request" subtitle="We are here to pray with you and for you." />
        <PrayerRequestForm onSubmit={addPrayerRequest} />
      </section>

      <Separator />

      <section>
        <SectionTitle title="Community Prayer Wall" subtitle="Lifting up needs together in faith for Sierra Leone, Ohio, and beyond."/>
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
