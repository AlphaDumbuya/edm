import PageHeader from '@/components/shared/page-header';
import MediaItem from '@/components/gallery/media-item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Video } from 'lucide-react';
import { getGalleryPhotos, getGalleryVideos } from '@/lib/db/gallery';
type Media = {
  id: string;
  type: 'photo' | 'video';
  title: string;
  date: string;
  imageUrl?: string;
  dataAiHint?: string;
  videoUrl?: string;
};

export default async function GalleryPage() {
  const photos = (await getGalleryPhotos()).map((item: any) => ({
    ...item,
    type: "photo" as "photo",
    date: item.date ?? '', // Ensure date is present; adjust as needed
  }));
  const videos = (await getGalleryVideos()).map((item: any) => ({
    ...item,
    type: "video" as "video",
    date: item.date ?? '', // Ensure date is present; adjust as needed
  }));

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Media Gallery & Resources"
        subtitle="See the impact of Evangelism, Discipleship, and Missions in Sierra Leone. Find photos, videos, and downloadable resources."
        icon={Camera}
      />
      {/* DEBUG: Show fetched photos data
      Remove or comment out in production
      <pre className="bg-gray-100 text-xs p-2 overflow-x-auto max-w-full border rounded mb-4">
        {JSON.stringify(photos, null, 2)}
      </pre> */}
      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 md:w-3/4 lg:w-1/2 mx-auto">
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Camera className="h-5 w-5" /> Photos
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-5 w-5" /> Videos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="photos" className="mt-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {photos.map((item: Media) => (
              <MediaItem key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos" className="mt-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {videos.map((item: Media) => (
              <MediaItem key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
