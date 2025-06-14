
import PageHeader from '@/components/shared/page-header';
import MediaItem from '@/components/gallery/media-item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Video, Download } from 'lucide-react';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const photos = [
  { id: 'photo1', type: 'photo', title: 'EDM Evangelism Outreach in Freetown', date: 'July 2024', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'sierra leone evangelism crowd' },
  { id: 'photo2', type: 'photo', title: 'Discipleship Group - Kossoh Town', date: 'June 2024', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'bible study group africa' },
  { id: 'photo3', type: 'photo', title: 'Ohio Partners Meeting for Sierra Leone', date: 'May 2024', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'meeting planning ohio' },
  { id: 'photo4', type: 'photo', title: 'Future Site of EDM Campus, Sierra Leone', date: 'April 2024', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'land plot construction africa' },
  { id: 'photo5', type: 'photo', title: 'Prayer Meeting for EDM Missions', date: 'March 2024', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'people praying group' },
  { id: 'photo6', type: 'photo', title: 'Children\'s Ministry after "Jesus" Film', date: 'February 2024', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'african children smiling' },
];

const videos = [
  { id: 'video1', type: 'video', title: 'Testimonies from EDM\'s Sierra Leone Mission', date: 'August 2024', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnailUrl: 'https://placehold.co/600x400.png', dataAiHint: 'sierra leone people interview' }, 
  { id: 'video2', type: 'video', title: 'A Day with an EDM Missionary in Freetown', date: 'July 2024', videoUrl: 'https://www.youtube.com/embed/L_LUpnjgPso', thumbnailUrl: 'https://placehold.co/600x400.png', dataAiHint: 'freetown daily life missionary' }, 
  { id: 'video3', type: 'video', title: 'EDM Vision: The Future Campus in Sierra Leone', date: 'January 2024', videoUrl: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', thumbnailUrl: 'https://placehold.co/600x400.png', dataAiHint: 'architectural rendering building africa' },
];

const downloads = [
    { id: 'download1', title: 'EDM Mission Overview Brochure', description: 'A comprehensive guide to our mission, vision, and work.', fileUrl: '/downloads/edm-brochure.pdf', type: 'PDF' },
    { id: 'download2', title: 'Monthly Prayer Guide - November 2024', description: 'Join us in prayer with specific points for this month.', fileUrl: '/downloads/prayer-guide-nov-2024.pdf', type: 'PDF' },
    { id: 'download3', title: 'EDM Presentation Slides', description: 'Slides for sharing about EDM with your church or group.', fileUrl: '/downloads/edm-presentation.pptx', type: 'PPTX' },
];

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Media Gallery & Resources"
        subtitle="See the impact of Evangelism, Discipleship, and Missions in Sierra Leone. Find photos, videos, and downloadable resources."
        icon={Camera}
      />

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 md:w-3/4 lg:w-1/2 mx-auto">
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Camera className="h-5 w-5" /> Photos
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-5 w-5" /> Videos
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <Download className="h-5 w-5" /> Downloads
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
        <TabsContent value="downloads" className="mt-8">
            <SectionTitle title="Downloadable Resources" subtitle="Flyers, brochures, prayer guides, and more."/>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloads.map(item => (
                <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                    <CardTitle className="flex items-center text-lg text-primary">
                        <Download className="h-5 w-5 mr-2" />
                        {item.title}
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <p className="text-xs text-muted-foreground">Type: {item.type}</p>
                    </CardContent>
                    <CardContent className="border-t pt-4">
                    {/* In a real app, ensure these files exist in the public/downloads folder */}
                    <a href={item.fileUrl} download target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">Download</Button>
                    </a>
                    </CardContent>
                </Card>
                ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
                Note: Downloadable files should be placed in the <code className="bg-muted px-1 rounded-sm">public/downloads</code> directory of the project.
            </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
