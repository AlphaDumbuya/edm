'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription as CardDesc } from '@/components/ui/card'; // Aliased CardDescription to avoid conflict
import { Button } from '@/components/ui/button';
import { PlayCircle, Maximize, CalendarDays } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useState } from 'react';

interface Media {
  id: string;
  type: 'photo' | 'video';
  title: string;
  date: string;
  imageUrl?: string;      // For photo or video thumbnail
  dataAiHint?: string;
  videoUrl?: string;      // For video playback
}

interface MediaItemProps {
  item: Media;
}

export default function MediaItem({ item }: MediaItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  let formattedDate = '';
  if (item.date) {
    try {
      formattedDate = new Date(item.date).toISOString().slice(0, 10);
    } catch {
      formattedDate = String(item.date);
    }
  }

  // Extract YouTube video ID if present
  let youtubeId = '';
  if (item.type === 'video' && item.videoUrl && item.videoUrl.includes('youtube')) {
    const match = item.videoUrl.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    youtubeId = match ? match[1] : '';
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="relative w-full aspect-square sm:aspect-video cursor-pointer group">
            {/* Show image for photos, or YouTube thumbnail for videos */}
            {item.type === 'photo' && item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                data-ai-hint={item.dataAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {item.type === 'video' && (
              <>
                {/* YouTube thumbnail preview */}
                {youtubeId ? (
                  <Image
                    src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                    alt={item.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 bg-black rounded-t"
                  />
                ) : (
                  // Fallback: show a dark background with play icon
                  <div className="absolute inset-0 bg-black flex items-center justify-center w-full h-full rounded-t" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 w-full h-full rounded-t">
                  <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                </div>
              </>
            )}
            {item.type === 'photo' && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize className="h-12 w-12 text-white/80" />
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0 bg-card">
          {item.type === 'photo' && item.imageUrl && (
            (<div className="relative w-full aspect-video">
              <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="contain" data-ai-hint={item.dataAiHint}/>
            </div>)
          )}
          {item.type === 'video' && item.videoUrl && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={item.videoUrl.includes("youtube.com/embed") ? item.videoUrl : `https://www.youtube.com/embed/${item.videoUrl.split('v=')[1]}`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          )}
           <DialogHeader className="p-4 border-t">
            <DialogTitle className="text-lg font-semibold text-primary">{item.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">{formattedDate}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <CardHeader className="p-3">
        <CardTitle className="text-md truncate">{item.title}</CardTitle>
        <CardDesc className="text-xs text-muted-foreground flex items-center"> {/* Used aliased CardDesc */}
          <CalendarDays className="mr-1 h-3 w-3" /> {formattedDate}
        </CardDesc>
      </CardHeader>
    </Card>
  );
}

