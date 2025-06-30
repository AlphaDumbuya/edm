import { getBlogPostBySlug } from '@/lib/db/blogPosts'; // Assuming this function exists
import PageHeader from '@/components/shared/page-header';
import { format } from 'date-fns';
import { BookOpenText } from 'lucide-react'; // Assuming this icon is used
import Image from 'next/image';
import { Metadata } from 'next';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  author: { name: string | null; };
  imageUrl?: string | null;
}
interface BlogPostPageProps { params: { slug: string; }; }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blogPost = await getBlogPostBySlug(params.slug);
  if (!blogPost) {
    return {
      title: 'Blog Post Not Found | EDM Blog',
      description: 'The requested blog post could not be found.',
    };
  }
  const plainText = blogPost.content.replace(/<[^>]+>/g, '').slice(0, 160);
  return {
    title: `${blogPost.title} | EDM Blog`,
    description: plainText,
    openGraph: {
      title: blogPost.title,
      description: plainText,
      type: 'article',
      url: `https://yourdomain.com/blog/${blogPost.slug}`,
      images: blogPost.imageUrl ? [blogPost.imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogPost = await getBlogPostBySlug(params.slug);

  if (!blogPost) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold">Blog Post Not Found</h1>
        <p className="text-muted-foreground mt-4">
          The blog post with the slug "{params.slug}" could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={blogPost.title}
        subtitle={`By ${blogPost.author?.name || 'Unknown Author'} on ${format(new Date(blogPost.createdAt), 'PPP')}`}
        icon={BookOpenText}
      />
      {blogPost.imageUrl && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
          <Image src={blogPost.imageUrl} alt={blogPost.title} fill className="object-cover" />
        </div>
      )}
      <article className="prose prose-lg dark:prose-invert mx-auto" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
    </div>
  );
}