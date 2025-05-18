
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardDescription as it's not used here
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsPost { // Renamed from BlogPost to NewsPost for clarity
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  imageUrl: string;
  dataAiHint?: string;
  tags?: string[];
}

interface NewsPostCardProps { // Renamed from BlogPostCardProps
  post: NewsPost;
}

export default function NewsPostCard({ post }: NewsPostCardProps) { // Renamed component
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <Link href={`/news/${post.slug}`} className="block relative w-full h-56 group">
        <Image
          src={post.imageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={post.dataAiHint}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <CardHeader className="p-4">
        <Link href={`/news/${post.slug}`}>
          <CardTitle className="text-xl hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground mt-1 space-y-1">
          <span className="flex items-center"><User className="mr-1 h-3 w-3 text-primary" /> By {post.author}</span>
          <span className="flex items-center"><CalendarDays className="mr-1 h-3 w-3 text-primary" /> {post.date}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link href={`/news/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
