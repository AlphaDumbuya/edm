
import PageHeader from '@/components/shared/page-header';
import { ArrowLeft, Newspaper, CalendarDays, User, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getNewsArticleBySlug, type NewsArticleWithAuthor } from '@/lib/db/news'; // Import the actual data fetching function and type

export default async function NewsPostPage({ params }: { params: { slug:string } }) {
  const post: NewsArticleWithAuthor | null = await getNewsArticleBySlug(params.slug);

  if (!post) {
    return (
      <div>
        <PageHeader title="News Post Not Found" icon={Newspaper} />
        <p className="text-center text-muted-foreground">The news post you are looking for does not exist or may have been moved.</p>
        <div className="text-center mt-8">
          <Link href="/news" legacyBehavior>
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM News & Updates</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader title={post.title} icon={Newspaper} />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-muted-foreground border-b pb-4 mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
 <User className="mr-2 h-5 w-5 text-primary" /> By:&nbsp;
 {post.author && typeof post.author === 'object' && 'name' in post.author ? (post.author as { name: string }).name : 'Unknown Author'}
        </div>
        <div className="flex items-center">
          {/* Assuming createdAt is a Date object from your Prisma query */}
          <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Published: {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
      {/* Assuming you have an imageUrl property in your news article */}
      {(post as any).imageUrl && (
        <div className="relative w-full h-40 md:h-60 rounded-lg overflow-hidden shadow-lg mb-8">
          {/* Replace with actual Image component if imageUrl is available */}
          <Image
            src={(post as any).imageUrl}
            alt={post.title}
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <article className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="text-center mt-12">
        <Link href="/news" legacyBehavior>
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM News & Updates</Button>
        </Link>
      </div>
    </div>
  );
}
