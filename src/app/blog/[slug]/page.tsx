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

  // Fetch related blogs (by same author or recent, excluding current)
  const { blogPosts: relatedBlogs } = await (await import('@/lib/db/blogPosts')).getAllBlogPosts({
    publishedOnly: true,
    limit: 3,
    orderBy: { createdAt: 'desc' },
  });
  const filteredRelated = (relatedBlogs || []).filter((b) => b.slug !== blogPost.slug).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section with Cover Image */}
      {blogPost.imageUrl && (
        <div className="relative w-full h-72 md:h-[420px] rounded-lg overflow-hidden shadow-lg mb-6 flex items-end justify-start">
          <Image
            src={blogPost.imageUrl}
            alt={blogPost.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{blogPost.title}</h1>
            <div className="text-sm md:text-base opacity-90">
              By {blogPost.author?.name || 'Unknown Author'} &middot; {format(new Date(blogPost.createdAt), 'PPP')}
            </div>
          </div>
        </div>
      )}
      {/* Back to Blog Page Button */}
      <div className="container mx-auto px-4 flex justify-start mb-4">
        <a href="/blog" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition font-medium shadow">
          &larr; Back to Blog
        </a>
      </div>
      {/* PageHeader for SEO and accessibility, but visually hidden if image is present */}
      <PageHeader
        title={blogPost.title}
        subtitle={`By ${blogPost.author?.name || 'Unknown Author'} on ${format(new Date(blogPost.createdAt), 'PPP')}`}
        icon={BookOpenText}
      />
      <article className="prose prose-lg dark:prose-invert mx-auto bg-white/90 dark:bg-black/30 p-6 rounded-lg shadow">
        <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </article>
      {/* Related Blogs Section */}
      {filteredRelated.length > 0 && (
        <div className="container mx-auto px-4 mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Blog Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRelated.map((post) => (
              <div key={post.id} className="h-full">
                <a href={`/blog/${post.slug}`} className="block group">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 shadow">
                    {post.imageUrl && (
                      <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    By {post.author?.name || 'Unknown Author'} &middot; {format(new Date(post.createdAt), 'PPP')}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}