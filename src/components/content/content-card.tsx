import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ContentItem {
  id: string;
  type: 'Article' | 'Testimony';
  title: string;
  author: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  dataAiHint?: string;
  slug: string; // Link to the full content
}

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full h-56">
        <Image
          src={item.imageUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={item.dataAiHint}
        />
        <Badge variant={item.type === 'Article' ? 'default' : 'secondary'} className="absolute top-2 right-2">{item.type}</Badge>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{item.title}</CardTitle>
        <div className="text-xs text-muted-foreground mt-1 space-x-2">
          <span className="flex items-center"><UserCircle className="mr-1 h-3 w-3 text-primary" /> {item.author}</span>
          <span className="flex items-center"><CalendarDays className="mr-1 h-3 w-3 text-primary" /> {item.date}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">{item.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link href={item.slug} className="w-full" legacyBehavior>
          <Button variant="outline" className="w-full">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
