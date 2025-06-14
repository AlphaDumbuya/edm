'use client';

import { useState } from 'react';
import PrayerRequestForm from './prayer-request-form';
import PrayerRequestCard from './prayer-request-card';
import SectionTitle from '@/components/shared/section-title';
import { createPublicPrayerRequest } from '@/app/get-involved/prayer/actions'; // Import the createPublicPrayerRequest function
import { Separator } from '../ui/separator';
import type { PrayerRequestData } from '@/types/prayerRequest'; // Adjust path if necessary

interface PrayerClientProps {
  initialPrayerRequests: PrayerRequestData[];
}

const PrayerClient: React.FC<PrayerClientProps> = ({ initialPrayerRequests }) => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequestData[]>(initialPrayerRequests);

  const handlePrayerRequestSubmit = async (requestData: Omit<PrayerRequestData, 'id' | 'timestamp'> & { isPublic: boolean, requestText: string, name: string, email?: string | null | undefined }) => {
    // Cast requestData to any to access requestText, as the original PrayerRequest type might not have it
    const requestDataAny = requestData as any;
    try {
      // Explicitly type the payload to ensure 'isPublic' is included
      const prayerRequestPayload: {
        request: string;
        authorName?: string | null | undefined;
        // authorEmail?: string | null | undefined; // Added authorEmail
        authorEmail?: string | null | undefined;
        isPublic?: boolean;
      } = {
        request: requestDataAny.requestText, // Map requestText to request
        authorName: requestDataAny.name, // Map name to authorName
        isPublic: requestDataAny.isPublic, // Include isPublic
      };
      await createPublicPrayerRequest(prayerRequestPayload);
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      // Handle error (e.g., show error toast)
    }
  };


  return (
    <div className="space-y-12">
      {/* PageHeader is likely in the parent Server Component */}

      <SectionTitle title="Submit Your Prayer Request" />
      <p className="text-muted-foreground">We are here to pray with you and for you.</p>

      <PrayerRequestForm onSubmit={handlePrayerRequestSubmit as any} />

      <Separator className="my-8" />

      <SectionTitle title="Community Prayer Wall" />
      <p className="text-muted-foreground">Lifting up needs together in faith for Sierra Leone, Oregon, and beyond.</p>


      {/* Display public prayer requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prayerRequests.length > 0 ? (
          prayerRequests.map(request => (
            <PrayerRequestCard key={request.id} request={request} />
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">No public prayer requests found yet.</p>
        )}
      </div>
    </div>
  );
};

export default PrayerClient;