import React from 'react';

interface NewsArticle {
  slug: string;
  title: string;
  content: string;
}

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

import { getNewsArticleBySlug } from '@/lib/db/news';
const PublicNewsArticlePage = async ({ params }: NewsArticlePageProps) => {
  const { slug } = params;

  console.log("Slug received on news page:", slug);
  // Fetch the news article data based on the slug
  const newsArticle = await getNewsArticleBySlug(slug);

  if (!newsArticle) {
    // Handle case where news article is not found
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-center">News Article Not Found</h1>
        <p className="text-center text-muted-foreground mt-4">
          The news article you are looking for does not exist.
        </p>
      </div>
    );
  }

  // Render the news article content
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{newsArticle.title}</h1>
      {/* You might want to use a library like dangerouslySetInnerHTML or a rich text renderer for content */}
      <div
        className="prose max-w-none" // Using a prose class for basic styling of HTML content
        dangerouslySetInnerHTML={{ __html: newsArticle.content }}
      />
      {/* Add other news article details here (author, date, etc.) */}
    </div>
  );
};

export default PublicNewsArticlePage;