import PageHeader from '@/components/shared/page-header';
import PrayerRequestForm from '@/components/prayer/prayer-request-form';
import PrayerRequestCard from '@/components/prayer/prayer-request-card';
import { HeartHandshake } from 'lucide-react';
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

interface PrayerRequestData {
  name: string;
  requestText: string;
  isPublic: boolean;
}

// Assume this function exists and fetches public prayer requests from your database
async function fetchPublicPrayerRequests(): Promise<PrayerRequest[]> {
  // Replace with your actual database fetching logic
  return []; // Return an empty array for now
}

export default async function PrayerPage() {
  // Fetch prayer requests from the database
  const publicRequests = await fetchPublicPrayerRequests();

  const handleSubmitPrayerRequest = async (request: PrayerRequestData) => {
    // TODO: Implement logic to submit prayer request to the database
    console.log('Submitting prayer request:', request);
    // You might want to revalidate the data or update the UI after submission
  };

  return (
    <div className="space-y-12">
      <PageHeader
        title="Prayer Wall"
        subtitle="Share your requests and join us in praying for one another."
        icon={HeartHandshake}
      />

      <section>
        <SectionTitle title="Submit Your Prayer Request" />
        <PrayerRequestForm onSubmit={handleSubmitPrayerRequest} /> {/* Modify PrayerRequestForm to handle submission */}
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
