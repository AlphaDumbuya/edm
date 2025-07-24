import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Post {
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
  post: Post;
  itemType?: 'blog' | 'news';
}

export default function BlogPostCard({ post, itemType = 'blog' }: NewsPostCardProps) {
  const href = itemType === 'blog' ? `/blog/${post.slug}` : `/news/${post.slug}`;

  if (itemType === 'news') {
    console.log('Generating news link with slug:', post.slug);
  }
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full w-full mb-4 p-0 sm:p-0 rounded-lg border border-border bg-card transform hover:-translate-y-1">
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
        href={href}
        className="block relative w-full h-48 sm:h-52 md:h-56 overflow-hidden group">
        {post.imageUrl && (
          <div className="relative w-full h-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              data-ai-hint={post.dataAiHint}
              className="transition-transform duration-300 group-hover:scale-102 rounded-none bg-muted/10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
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
        <Link href={href} className="w-full">
          <Button className="w-full text-sm flex items-center justify-center space-x-2 whitespace-nowrap">
            <span>Read More</span>
            <ArrowRight className="h-4 w-4 flex-shrink-0" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
