import PageHeader from '@/components/shared/page-header';
import BlogPostCard from '@/components/blog/blog-post-card';
import { BookOpen, CircleDollarSign } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/db/blogPosts';
import { findUserById } from '@/lib/db/users';

export default async function BlogPage() {
  const { blogPosts } = await getAllBlogPosts(); // Fetch blog posts from the database

  // Fetch author names for each blog post
  const postsWithAuthors = await Promise.all(blogPosts.map(async (post) => {
    const author = await findUserById(post.authorId);
    return {
      ...post,
      authorName: author?.name || 'Unknown Author', // Use author's name or 'Unknown Author'
    };
  }));

  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Blog"
        subtitle="Insights, updates, and stories from our Evangelism, Discipleship, and Missions work in Sierra Leone."
        icon={BookOpen}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {postsWithAuthors.map(post => (
          <BlogPostCard
 key={post.slug}
 post={{
 slug: post.slug,
 title: post.title,
 author: { name: post.authorName }, // Using fetched author name
 date: post.createdAt.toLocaleDateString(), // Formatting date
 excerpt: post.content.substring(0, 150) + '...', // Generating excerpt
 imageUrl: post.imageUrl || '', // Using empty string if imageUrl is null
 dataAiHint: '', // Placeholder
 tags: [], // Placeholder
            }}
 />
        ))}
      </div>
    </div>
  );
}

