'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Maximize, CalendarDays } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
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

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="relative w-full h-56 cursor-pointer group">
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={item.dataAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
              </div>
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
            <div className="relative w-full aspect-video">
            <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="contain" data-ai-hint={item.dataAiHint}/>
            </div>
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
           <div className="p-4">
            <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.date}</p>
          </div>
        </DialogContent>
      </Dialog>
      <CardHeader className="p-3">
        <CardTitle className="text-md truncate">{item.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground flex items-center">
          <CalendarDays className="mr-1 h-3 w-3" /> {item.date}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
