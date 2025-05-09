import PageHeader from '@/components/shared/page-header';
import BlogPostCard from '@/components/blog/blog-post-card';
import { BookOpen } from 'lucide-react';

const blogPosts = [
  {
    slug: 'the-heart-of-evangelism',
    title: 'The Heart of Evangelism: A Sierra Leonean Perspective',
    date: 'October 1, 2024',
    author: 'Pastor Samuel Green',
    excerpt: 'Exploring the core principles of sharing faith effectively within the cultural context of Sierra Leone, with love and genuine connection.',
    imageUrl: 'https://picsum.photos/seed/blogpostSL1/400/250',
    dataAiHint: 'sierra leone faith sharing',
    tags: ['Evangelism', 'Faith', 'Sierra Leone'],
  },
  {
    slug: 'discipleship-in-the-modern-age',
    title: 'Discipleship Across Continents: Connecting Freetown and Ohio',
    date: 'October 5, 2024',
    author: 'Maria Rodriguez',
    excerpt: 'Navigating mentorship in a digital world, building meaningful discipleship between our Sierra Leonean communities and Ohio partners.',
    imageUrl: 'https://picsum.photos/seed/blogpostOH1/400/250',
    dataAiHint: 'people video call diverse',
    tags: ['Discipleship', 'Mentorship', 'Global Church'],
  },
  {
    slug: 'mission-report-sierra-leone',
    title: 'Mission Report: Hope and Healing in Rural Sierra Leone',
    date: 'October 12, 2024',
    author: 'EDM Mission Team',
    excerpt: 'An update from our recent outreach in Sierra Leone, sharing stories of lives touched and communities transformed by God\'s grace.',
    imageUrl: 'https://picsum.photos/seed/blogpostSL2/400/250',
    dataAiHint: 'sierra leone children smiling',
    tags: ['Missions', 'Sierra Leone', 'Field Report'],
  },
  {
    slug: 'power-of-prayer-in-missions',
    title: 'The Unseen Power: Prayer for Sierra Leone and Ohio',
    date: 'October 18, 2024',
    author: 'Dr. Evelyn Reed',
    excerpt: 'Delving into the critical role of prayer as the backbone of our mission endeavors in Sierra Leone and our partnerships in Ohio.',
    imageUrl: 'https://picsum.photos/seed/blogpostprayer/400/250',
    dataAiHint: 'hands praying light map',
    tags: ['Prayer', 'Missions', 'Spiritual Warfare'],
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Our Blog"
        subtitle="Advice, insights, and updates from our work in Sierra Leone and Ohio."
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

