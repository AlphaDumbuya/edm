import PageHeader from '@/components/shared/page-header';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import PrayerClient from '@/components/prayer/PrayerClient';
import PrayerRequestCard from '@/components/prayer/prayer-request-card';
import { HeartHandshake } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SectionTitle from '@/components/shared/section-title';
import { getAllPrayerRequests, createPrayerRequest } from '@/lib/db/prayerRequests';
import { format } from 'date-fns';
import { PrayerRequestData } from '@/types/prayerRequest'; // Assuming PrayerRequestData is defined here

export default async function PrayerPage() {
  noStore(); // Opt out of caching for this data fetch
  const { prayerRequests } = await getAllPrayerRequests();
  const initialPublicPrayerRequests = prayerRequests.filter(request => request.status === 'Public');

  // Map the fetched data to the PrayerRequestData type expected by PrayerClient
  const formattedPublicPrayerRequests: PrayerRequestData[] = initialPublicPrayerRequests.map((request) => {
    const createdAtDate = request.createdAt ? new Date(request.createdAt) : new Date();
    const updatedAtDate = request.updatedAt ? new Date(request.updatedAt) : new Date();
    return {
      id: request.id,
      request: request.body, // Map 'body' to 'request'
      name: request.authorName || '', // Map 'authorName' to 'name', provide default empty string
      email: request.authorEmail || '', // Map 'authorEmail' to 'email', provide default empty string
      status: request.status,
      isPublic: request.status === 'Public', // Derive 'isPublic' from 'status'
      createdAt: createdAtDate,
      updatedAt: updatedAtDate,
      formattedFullDate: format(createdAtDate, 'MMMM d, yyyy \'at\' h:mm a'), // Format the date here
    };
  });

  return (
    <div className="space-y-12">
      <PageHeader
 title="EDM Prayer Wall"
        subtitle="Share your requests and join us in praying for one another, our mission in Sierra Leone, and our Oregon partners."
        icon={HeartHandshake}
      />

      <div className="space-y-4">
        <SectionTitle title="The Power of Prayer" />
        <p className="text-muted-foreground">
          Prayer is foundational to all that EDM does. We believe in a God who hears and answers prayer, and we rely on His guidance, provision, and power to fulfill our mission in Sierra Leone and support our partnerships in Oregon.
        </p>
        <p className="text-muted-foreground">
          Your prayers are a vital part of this ministry. Join us by submitting your own requests or by lifting up the needs shared by others.
        </p>
      </div>

      <Separator className="my-8" />

      <SectionTitle title="Submit Your Prayer Request" />
      <p className="text-muted-foreground mt-2 mb-6">
        We are here to pray with you and for you.
      </p>

      <PrayerClient initialPrayerRequests={formattedPublicPrayerRequests} />
    </div>
  );
}
