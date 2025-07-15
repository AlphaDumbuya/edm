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
  const initialPublicPrayerRequests = prayerRequests.filter(request => request.published === true);

  // Map the fetched data to the PrayerRequestData type expected by PrayerClient
  const formattedPublicPrayerRequests: PrayerRequestData[] = initialPublicPrayerRequests.map((request) => {
    const createdAtDate = request.createdAt ? new Date(request.createdAt) : new Date();
    const updatedAtDate = request.updatedAt ? new Date(request.updatedAt) : new Date();
    return {
      id: request.id,
      title: request.title,
      body: request.body,
      authorName: request.authorName || undefined,
      authorEmail: request.authorEmail || undefined,
      published: request.published,
      category: request.category || undefined,
      createdAt: createdAtDate,
      updatedAt: updatedAtDate,
      formattedFullDate: format(createdAtDate, 'MMMM d, yyyy \'at\' h:mm a')
    };
  });

  return (
    <div className="space-y-12">
      <PageHeader
 title="EDM Prayer Wall"
        subtitle="Share your requests and join us in praying for one another, our mission in Sierra Leone, and our Oregon partners."
        icon={HeartHandshake}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Text Content */}
        <div className="space-y-4">
          <SectionTitle title="The Power of Prayer" subtitle="Share your requests and join us in praying for one another, our mission in Sierra Leone, and our Oregon partners."/>
          <p className="text-muted-foreground">
            Prayer is foundational to all that EDM does. We believe in a God who hears and answers prayer, and we rely on His guidance, provision, and power to fulfill our mission in Sierra Leone and support our partnerships in Oregon. Your prayers are a vital part of this ministry. Join us by submitting your own requests or by lifting up the needs shared by others.
          </p>
        </div>

        {/* Right Column: Image Card */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="https://plus.unsplash.com/premium_photo-1725408009157-3e89fa57f253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJsYWNrJTIwcGVvcGxlJTIwcHJheWluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Black people praying"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <Separator className="my-8" />

      <PrayerClient initialPrayerRequests={formattedPublicPrayerRequests} />
    </div>
  );
}
