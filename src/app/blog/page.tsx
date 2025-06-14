
import PageHeader from '@/components/shared/page-header';
import BlogPostCard from '@/components/blog/blog-post-card';
import { BookOpen } from 'lucide-react';

const blogPosts = [
  {
    slug: 'the-heart-of-evangelism',
    title: 'The Unstoppable Call: Evangelism in Sierra Leone',
    date: 'October 1, 2024',
    author: 'EDM Team',
    excerpt: 'Exploring Romans 10:13-15 and our deep conviction to share the Gospel across Sierra Leone. The urgency and joy of leading others to Christ.',
    imageUrl: 'https://source.unsplash.com/random/400x250/?sierra,leone,preaching,gospel',
    dataAiHint: 'sierra leone preaching gospel',
    tags: ['Evangelism', 'Great Commission', 'Sierra Leone'],
  },
  {
    slug: 'discipleship-in-the-modern-age',
    title: 'Building Mature Disciples: The EDM Way',
    date: 'October 5, 2024',
    author: 'EDM Team',
    excerpt: 'Matthew 28:18-20 guides our approach to not just make converts, but to train believers to full maturity in Christ, ready to train others.',
    imageUrl: 'https://source.unsplash.com/random/400x250/?bible,study,group,africa',
    dataAiHint: 'bible study group africa',
    tags: ['Discipleship', 'Mentorship', 'Christian Growth'],
  },
  {
    slug: 'edm-campus-vision',
    title: 'A Vision for the Future: The EDM Campus in Sierra Leone',
    date: 'October 12, 2024',
    author: 'EDM Leadership',
    excerpt: 'Our dream for a dedicated hub for the body of Christ in Sierra Leone – a place for retreat, training, and outreach. Learn about our plans and how you can help.',
    imageUrl: 'https://source.unsplash.com/random/400x250/?building,plans,construction,africa',
    dataAiHint: 'building plans construction africa',
    tags: ['Missions', 'Vision', 'Sierra Leone', 'Campus Project'],
  },
  {
    slug: 'ohio-partnership-impact',
    title: 'Partnership Power: Ohio & Sierra Leone United for the Gospel',
    date: 'October 18, 2024',
    author: 'EDM Team',
    excerpt: 'Highlighting the vital role of our Ohio partners in prayer, support, and collaboration for the mission in Sierra Leone.',
    imageUrl: 'https://source.unsplash.com/random/400x250/?hands,shaking,diverse,map',
    dataAiHint: 'hands shaking diverse map',
    tags: ['Partnership', 'Missions', 'Ohio', 'Global Church'],
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Blog"
        subtitle="Insights, updates, and stories from our Evangelism, Discipleship, and Missions work in Sierra Leone."
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

