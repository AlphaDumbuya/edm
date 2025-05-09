import PageHeader from '@/components/shared/page-header';
import MediaItem from '@/components/gallery/media-item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Video } from 'lucide-react';

const photos = [
  { id: 'photo1', type: 'photo', title: 'Community baptism in Sierra Leone River', date: 'July 2024', imageUrl: 'https://picsum.photos/seed/galleryphotoSL1/600/400', dataAiHint: 'baptism river sierra leone' },
  { id: 'photo2', type: 'photo', title: 'Children\'s Bible Club in Freetown', date: 'June 2024', imageUrl: 'https://picsum.photos/seed/galleryphotoSL2/600/400', dataAiHint: 'children playing freetown' },
  { id: 'photo3', type: 'photo', title: 'Leadership training in Columbus, Ohio', date: 'May 2024', imageUrl: 'https://picsum.photos/seed/galleryphotoOH1/600/400', dataAiHint: 'conference group ohio' },
  { id: 'photo4', type: 'photo', title: 'Local outreach event in Bo, SL', date: 'April 2024', imageUrl: 'https://picsum.photos/seed/galleryphotoSL3/600/400', dataAiHint: 'sierra leone community event' },
  { id: 'photo5', type: 'photo', title: 'Mission team prayer - Freetown & Ohio Link', date: 'March 2024', imageUrl: 'https://picsum.photos/seed/galleryphotoPrayer/600/400', dataAiHint: 'people praying video call' },
  { id: 'photo6', type: 'photo', title: 'Construction of a new church, Kono District', date: 'February 2024', imageUrl: 'https://picsum.photos/seed/galleryphotoSL4/600/400', dataAiHint: 'sierra leone building construction' },
];

const videos = [
  { id: 'video1', type: 'video', title: 'Testimonies from Sierra Leone Mission', date: 'August 2024', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnailUrl: 'https://picsum.photos/seed/galleryvideoSL1/600/400', dataAiHint: 'sierra leone landscape drone' }, 
  { id: 'video2', type: 'video', title: 'A Day with an EDM Missionary in Freetown', date: 'July 2024', videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso', thumbnailUrl: 'https://picsum.photos/seed/galleryvideoSL2/600/400', dataAiHint: 'freetown person journaling sunrise' }, 
  { id: 'video3', type: 'video', title: 'EDM Sierra Leone & Ohio Impact Review', date: 'January 2024', videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', thumbnailUrl: 'https://picsum.photos/seed/galleryvideoImpact/600/400', dataAiHint: 'montage sierra leone ohio people' },
];

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Media Gallery"
        subtitle="See the impact of our mission in Sierra Leone and Ohio through photos and videos."
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

