// src/app/get-involved/prayer/page.tsx

'use client';

import PageHeader from '@/components/shared/page-header';
import PrayerRequestForm from '@/components/prayer/prayer-request-form';
import PrayerRequestCard from '@/components/prayer/prayer-request-card';
import { HeartHandshake } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import SectionTitle from '@/components/shared/section-title';
import Image from 'next/image';

// Make sure this interface matches your database structure for prayer requests
export interface PrayerRequest {
  id: string;
  name: string; // Can be 'Anonymous'
  requestText: string;
  isPublic: boolean;
  timestamp: Date; // Or string if stored as ISO string in DB
  category?: string; // e.g., Healing, Guidance, Family
}

// REMOVE the initialRequests array - we will fetch from the database
// const initialRequests: PrayerRequest[] = [
//   { id: '1', name: 'Anonymous', requestText: 'Please pray for healing for my mother who is unwell in Freetown.', isPublic: true, timestamp: new Date(Date.now() - 86400000 * 2), category: 'Healing' },
//   { id: '2', name: 'Sarah P. (Oregon Partner)', requestText: 'Praying for guidance for EDM\'s leadership as they make strategic decisions.', isPublic: true, timestamp: new Date(Date.now() - 86400000), category: 'Guidance' },
//   { id: '3', name: 'Anonymous', requestText: 'For peace and provision
 for families affected by recent flooding in Sierra Leone.', isPublic: true, timestamp: new Date(), category: 'Comfort' },
//   { id: '4', name: 'John B.', requestText: 'Pray for successful customs clearance of the van and equipment for EDM Sierra Leone.', isPublic: true, timestamp: new Date(Date.now() - 3600000 * 5), category: 'EDM Projects' },
// ];

// IMPORT your database fetching function
// Replace '@/lib/firebase' with the actual path to your Firebase utility file
import { getPublicPrayerRequests } from '@/lib/firebase'; // Assuming you have a function for this

export default function PrayerPage() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        // Call your function to fetch public prayer requests from the database
        const requests = await getPublicPrayerRequests();
        // Sort by timestamp (newest first) - ensure your DB query orders correctly or sort here
        setPrayerRequests(requests.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      } catch (err: any) {
        console.error("Error fetching prayer requests:", err);
        setError("Failed to load prayer requests. Please try again later."); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching (success or failure)
      }
    };

    fetchRequests();

    // The cleanup function for useEffect is not strictly necessary here unless you have
    // listeners or subscriptions that need to be cleaned up.
    // return () => cleanupFunction();

  }, []); // Empty dependency array ensures this runs only once on mount

  // Modify the addPrayerRequest function if you also want to add new requests to the DB
  const addPrayerRequest = async (request: Omit<PrayerRequest, 'id' | 'timestamp'>) => {
    // In a real app, you would add this to the database first
    // Then refetch or update the state with the new data from the DB
    console.log("Submitting prayer request:", request);

    // Example: Add to database (you'll need to implement this function)
    // const newRequestInDB = await addPrayerRequestToDB(request);

    // For now, we'll simulate adding to state - REMOVE this section when you
    // integrate database submission and fetching.
    const newRequest: PrayerRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9), // Use a more robust ID if adding to DB
      timestamp: new Date(),
    };
    setPrayerRequests(prevRequests => [newRequest, ...prevRequests].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    // End of simulation section
  };

  // Filter for public requests (already handled if your fetch function only gets public ones)
  // const publicRequests = prayerRequests.filter(req => req.isPublic); // You might not need this filter if your fetch function does it

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Prayer Wall"
        subtitle="Share your requests and join us in praying for one another, our mission in Sierra Leone, and our Oregon partners."
        icon={HeartHandshake}
      />

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
         <div className="rounded-lg overflow-hidden shadow-xl h-64 md:h-80 relative">
          <Image
            src="https://images.unsplash.com/photo-1583090318293-ebd145b2c63f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHByYXllcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Hands clasped in prayer"
            layout="fill"
            objectFit="cover"
            data-ai-hint="prayer hands togetherness"
          />
        </div>
        <div>
          <SectionTitle title="The Power of Prayer" />
          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            Prayer is foundational to all that EDM does. We believe in a God who hears and answers prayer, and we rely on His guidance, provision, and power to fulfill our mission in Sierra Leone and support our partnerships in Oregon.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Your prayers are a vital part of this ministry. Join us by submitting your own requests or by lifting up the needs shared by others.
          </p>
        </div>
      </section>


      <section>
        <SectionTitle title="Submit Your Prayer Request" subtitle="We are here to pray with you and for you." />
        {/* Pass the addPrayerRequest function to your form component */}
        <PrayerRequestForm onSubmit={addPrayerRequest} />
      </section>

      <Separator />

      <section>
        <SectionTitle title="Community Prayer Wall" subtitle="Lifting up needs together in faith for Sierra Leone, Oregon, and beyond."/>

        {/* Display loading, error, or no requests message */}
        {loading && <p className="text-center text-muted-foreground py-8">Loading prayer requests...</p>}
        {error && <p className="text-center text-red-500 py-8">{error}</p>}
        {!loading && !error && prayerRequests.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No public prayer requests at this time. Be the first to share or check back soon.
          </p>
        )}

        {/* Render the fetched prayer requests */}
        {!loading && !error && prayerRequests.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map over prayerRequests (which are fetched from the DB) */}
            {prayerRequests.map(request => (
              <PrayerRequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
