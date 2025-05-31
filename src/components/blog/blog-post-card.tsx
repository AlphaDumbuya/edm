
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsPost {
  slug: string;
  title: string;
  author: { name: string };
  date: string;
  imageUrl: string;
  excerpt: string;
  dataAiHint?: string;
  tags?: string[];
}

interface NewsPostCardProps {
  post: NewsPost;
}

export default function NewsPostCard({ post }: NewsPostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-3 sm:p-4 flex flex-col">
        <Link href={`/news/${post.slug}`}>
          <CardTitle className="text-lg sm:text-xl hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground mt-1 space-y-0.5 sm:space-y-1">
          <span className="flex items-center"><User className="mr-1 h-3 w-3 text-primary" /> By {post.author.name}</span>
          <span className="flex items-center"><CalendarDays className="mr-1 h-3 w-3 text-primary" /> {post.date}</span>
        </div>
      </CardHeader>
      <Link
        href={`/news/${post.slug}`}
        className="block relative w-full h-32 sm:h-40 group"
      >
        {post.imageUrl && (
 <Image
 src={post.imageUrl}
 alt={post.title}
 fill={true}
 style={{ objectFit: 'contain' }}
 data-ai-hint={post.dataAiHint}
 className="transition-transform duration-300 group-hover:scale-105"
 />
 )}
      </Link>
      <CardContent className="p-3 sm:p-4 flex-grow">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 sm:p-4 border-t">
        <Link href={`/news/${post.slug}`} className="w-full" legacyBehavior>
 <Button className="w-full text-sm">
 Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
 </Link>
      </CardFooter>
    </Card>
  );
}
