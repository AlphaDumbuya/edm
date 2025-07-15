import React from 'react';
import { getNewsArticleBySlug, getAllNewsArticles } from '@/lib/db/news';
import Image from 'next/image';
import { format } from 'date-fns';
import { BookOpenText } from 'lucide-react';

interface NewsArticle {
  slug: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: {
    name: string;
  };
  createdAt?: string;
}

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

const PublicNewsArticlePage = async (context: NewsArticlePageProps) => {
  const slug = context.params.slug.trim().toLowerCase().replace(/\s+/g, '-');
  const newsArticle = await getNewsArticleBySlug(slug);

  if (!newsArticle) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-center">News Article Not Found</h1>
        <p className="text-center text-muted-foreground mt-4">
          The news article you are looking for does not exist.
        </p>
      </div>
    );
  }

  // Fetch related news (recent, excluding current)
  const allNews = await getAllNewsArticles();
  const relatedNews = allNews.filter((n) => n.slug !== newsArticle.slug).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section with Cover Image */}
      {newsArticle.imageUrl && (
        <div className="relative w-full h-72 md:h-[420px] rounded-lg overflow-hidden shadow-lg mb-6 flex items-end justify-start">
          <Image
            src={newsArticle.imageUrl}
            alt={newsArticle.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{newsArticle.title}</h1>
            <div className="text-sm md:text-base opacity-90">
              By {newsArticle.author?.name || 'Unknown Author'} &middot; {newsArticle.createdAt ? format(new Date(newsArticle.createdAt), 'PPP') : ''}
            </div>
          </div>
        </div>
      )}
      {/* Back to News Page Button */}
      <div className="container mx-auto px-4 flex justify-start mb-4">
        <a href="/news" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition font-medium shadow">
          &larr; Back to News
        </a>
      </div>
      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert mx-auto bg-white/90 dark:bg-black/30 p-6 rounded-lg shadow">
        <div dangerouslySetInnerHTML={{ __html: newsArticle.content }} />
      </article>
      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <div className="container mx-auto px-4 mt-10">
          <h2 className="text-2xl font-bold mb-4">Related News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <div key={item.id} className="h-full">
                <a href={`/news/${item.slug}`} className="block group">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 shadow">
                    {item.imageUrl && (
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    By {item.author?.name || 'Unknown Author'} &middot; {item.createdAt ? format(new Date(item.createdAt), 'PPP') : ''}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicNewsArticlePage;