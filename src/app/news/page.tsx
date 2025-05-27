
'use client';

import PageHeader from '@/components/shared/page-header';
import NewsPostCard from '@/components/blog/blog-post-card'; // Re-using this component
import { type NewsPost } from '@/types/news'; // Assuming you have a type definition for NewsPost
import { getNewsArticlesAction } from '../admin/content/news/actions';
import { Newspaper } from 'lucide-react';

export default async function NewsPage() {
  const newsItems = await getNewsArticlesAction({});

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM News & Updates"
        subtitle="Stay informed with the latest progress reports, event recaps, field testimonies, prayer updates, and construction milestones from our work in Sierra Leone and Oregon."
        icon={Newspaper}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.newsArticles.map(article => {
          // Transform the article to match the NewsPost type expected by NewsPostCard
          const post: NewsPost = {
            ...article, // Spread existing properties (id, title, slug, content, etc.)
            date: article.createdAt.toLocaleDateString(), // Map createdAt to date
            author: 'EDM Team', // Placeholder author
            excerpt: article.content.substring(0, 150) + '...', // Create excerpt (adjust length as needed)
            imageUrl: 'https://placehold.co/600x400', // Placeholder image URL (replace with actual image logic)
          };
          return <NewsPostCard key={post.slug} post={post} />;
        })}\
      </div>
    </div>
  );
}