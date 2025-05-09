import PageHeader from '@/components/shared/page-header';
import BlogPostCard from '@/components/blog/blog-post-card';
import { BookOpen } from 'lucide-react';

const blogPosts = [
  {
    slug: 'the-heart-of-evangelism',
    title: 'The Heart of Evangelism: More Than Just Words',
    date: 'October 1, 2024',
    author: 'Pastor Samuel Green',
    excerpt: 'Exploring the core principles of sharing faith effectively and with genuine love. It\'s about connecting, not just converting.',
    imageUrl: 'https://picsum.photos/seed/blogpost1/400/250',
    dataAiHint: 'open bible heart',
    tags: ['Evangelism', 'Faith', 'Ministry'],
  },
  {
    slug: 'discipleship-in-the-modern-age',
    title: 'Discipleship in the Modern Age: Challenges & Opportunities',
    date: 'October 5, 2024',
    author: 'Maria Rodriguez',
    excerpt: 'Navigating the complexities of mentorship in a fast-paced, digital world. How to build meaningful discipleship relationships.',
    imageUrl: 'https://picsum.photos/seed/blogpost2/400/250',
    dataAiHint: 'people talking technology',
    tags: ['Discipleship', 'Mentorship', 'Community'],
  },
  {
    slug: 'mission-report-east-africa',
    title: 'Mission Report: Hope and Healing in East Africa',
    date: 'October 12, 2024',
    author: 'EDM Mission Team',
    excerpt: 'An update from our recent mission trip, sharing stories of lives touched and communities transformed by God\'s grace.',
    imageUrl: 'https://picsum.photos/seed/blogpost3/400/250',
    dataAiHint: 'african children smiling',
    tags: ['Missions', 'Field Report', 'Global Impact'],
  },
  {
    slug: 'power-of-prayer-in-missions',
    title: 'The Unseen Power: Prayer in Missions',
    date: 'October 18, 2024',
    author: 'Dr. Evelyn Reed',
    excerpt: 'Delving into the critical role of prayer as the backbone of all successful mission endeavors. Your prayers matter!',
    imageUrl: 'https://picsum.photos/seed/blogpost4/400/250',
    dataAiHint: 'hands praying light',
    tags: ['Prayer', 'Missions', 'Spiritual Warfare'],
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Blog"
        subtitle="Advice, insights, and updates related to our mission and work."
        icon={BookOpen}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
