'use client';

import PageHeader from '@/components/shared/page-header';
import NewsPostCard from '@/components/blog/blog-post-card'; // Re-using this component
import { type NewsPost } from '@/types/news'; // Assuming you have a type definition for NewsPost
import { getNewsArticlesAction } from '../admin/content/news/actions';
import { Newspaper } from 'lucide-react';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<{ newsArticles: NewsPost[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const items = await getNewsArticlesAction({});
      // Transform the articles to match the NewsPost type expected by NewsPostCard
      const transformedItems = items.newsArticles.map((article: any) => ({
        id: article.id,
        createdAt: new Date(article.createdAt), // Ensure it's a Date object
        title: article.title,
        slug: article.slug,
        content: article.content,
        date: new Date(article.createdAt).toLocaleDateString(), // Map createdAt to date string
        author: article.author || 'EDM Team', // Use article author if available, otherwise placeholder
        excerpt: article.content ? article.content.substring(0, 150) + '...' : '', // Create excerpt
        imageUrl: article.imageUrl || 'https://placehold.co/600x400', // Use article imageUrl if available, otherwise placeholder
      }));
      setNewsItems({ newsArticles: transformedItems });
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM News & Updates"
        subtitle="Stay informed with the latest progress reports, event recaps, field testimonies, prayer updates, and construction milestones from our work in Sierra Leone and Oregon."
        icon={Newspaper} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : newsItems && newsItems.newsArticles.length > 0 ? (
 newsItems.newsArticles.map(post => (
 <NewsPostCard key={post.slug} post={post} />
 ))
        ) : (
          <p>No news articles found.</p>
        )}
      </div>
    </div>
  );
}
