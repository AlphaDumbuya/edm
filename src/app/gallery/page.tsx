import PageHeader from '@/components/shared/page-header';
import MediaItem from '@/components/gallery/media-item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Video } from 'lucide-react';

const photos = [
  { id: 'photo1', type: 'photo', title: 'Community baptism in Kenya', date: 'July 2024', imageUrl: 'https://picsum.photos/seed/galleryphoto1/600/400', dataAiHint: 'baptism river africa' },
  { id: 'photo2', type: 'photo', title: 'Children\'s program in Peru', date: 'June 2024', imageUrl: 'https://picsum.photos/seed/galleryphoto2/600/400', dataAiHint: 'children playing peru' },
  { id: 'photo3', type: 'photo', title: 'Leadership training in Thailand', date: 'May 2024', imageUrl: 'https://picsum.photos/seed/galleryphoto3/600/400', dataAiHint: 'conference group asia' },
  { id: 'photo4', type: 'photo', title: 'Local outreach event', date: 'April 2024', imageUrl: 'https://picsum.photos/seed/galleryphoto4/600/400', dataAiHint: 'community event park' },
  { id: 'photo5', type: 'photo', title: 'Mission team prayer', date: 'March 2024', imageUrl: 'https://picsum.photos/seed/galleryphoto5/600/400', dataAiHint: 'people praying circle' },
  { id: 'photo6', type: 'photo', title: 'Construction of a new church', date: 'February 2024', imageUrl: 'https://picsum.photos/seed/galleryphoto6/600/400', dataAiHint: 'building construction site' },
];

const videos = [
  { id: 'video1', type: 'video', title: 'Testimonies from East Africa Mission', date: 'August 2024', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnailUrl: 'https://picsum.photos/seed/galleryvideo1/600/400', dataAiHint: 'african landscape drone' }, // Placeholder video
  { id: 'video2', type: 'video', title: 'A Day in the Life of a Missionary', date: 'July 2024', videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso', thumbnailUrl: 'https://picsum.photos/seed/galleryvideo2/600/400', dataAiHint: 'person journaling sunrise' }, // Placeholder video
  { id: 'video3', type: 'video', title: 'EDM Connect Year in Review', date: 'January 2024', videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', thumbnailUrl: 'https://picsum.photos/seed/galleryvideo3/600/400', dataAiHint: 'montage diverse people' }, // Placeholder video
];

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Media Gallery"
        subtitle="See the impact of our mission through photos and videos."
        icon={Camera}
      />

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Camera className="h-5 w-5" /> Photos
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-5 w-5" /> Videos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="photos" className="mt-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map(item => (
              <MediaItem key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos" className="mt-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(item => (
              <MediaItem key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
