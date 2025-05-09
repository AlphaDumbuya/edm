import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  imageUrl: string;
  dataAiHint?: string;
  tags?: string[];
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <Link href={`/blog/${post.slug}`} className="block relative w-full h-56">
        <Image
          src={post.imageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={post.dataAiHint}
        />
      </Link>
      <CardHeader className="p-4">
        <Link href={`/blog/${post.slug}`}>
          <CardTitle className="text-xl hover:text-primary transition-colors">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground mt-1 space-y-1">
          <span className="flex items-center"><User className="mr-1 h-3 w-3 text-primary" /> By {post.author}</span>
          <span className="flex items-center"><CalendarDays className="mr-1 h-3 w-3 text-primary" /> {post.date}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
