"use client";
import PageHeader from '@/components/shared/page-header';
import BlogPostCard from '@/components/blog/blog-post-card';
import { BookOpen } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/db/blogPosts';
import { findUserById } from '@/lib/db/users';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const ITEMS_PER_PAGE = 9;

function stripHtml(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
}

export default async function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page) || 1;
  let blogPosts: any[] = [];
  let totalCount = 0;
  let error = null;
  try {
    const result = await getAllBlogPosts({ offset: (page - 1) * ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE, publishedOnly: true });
    blogPosts = result.blogPosts;
    totalCount = result.totalCount;
  } catch (e: any) {
    error = e.message || 'Failed to load blog posts.';
  }

  if (error) {
    return <div className="container mx-auto py-12 text-center text-red-500">{error}</div>;
  }

  if (!blogPosts || blogPosts.length === 0) {
    return <div className="container mx-auto py-12 text-center text-gray-500">No blog posts found.</div>;
  }

  // Fetch author names for each blog post
  const postsWithAuthors = await Promise.all(blogPosts.map(async (post) => {
    const author = await findUserById(post.authorId);
    return {
      ...post,
      authorName: author?.name || 'Unknown Author',
    };
  }));

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Pagination navigation logic
  const getPageUrl = (p: number) => `?page=${p}`;

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Blog"
        subtitle="Insights, updates, and stories from our Evangelism, Discipleship, and Missions work in Sierra Leone."
        icon={BookOpen}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsWithAuthors.map(post => (
          <div key={post.slug} className="w-full flex">
            <BlogPostCard
              post={{
                slug: post.slug,
                title: post.title,
                author: { name: post.authorName },
                date: post.createdAt.toLocaleDateString(),
                excerpt: stripHtml(post.content).substring(0, 150) + '...',
                imageUrl: post.imageUrl || '',
                dataAiHint: '',
                tags: [],
              }}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => window.location.search = getPageUrl(page - 1)} disabled={page <= 1} />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink onClick={() => window.location.search = getPageUrl(i + 1)} isActive={page === i + 1}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => window.location.search = getPageUrl(page + 1)} disabled={page >= totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

