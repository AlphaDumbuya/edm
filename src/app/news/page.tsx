
import PageHeader from '@/components/shared/page-header';
import BlogPostCard from '@/components/blog/blog-post-card'; // Re-using this component, might rename later
import { Newspaper } from 'lucide-react';

const newsItems = [
  {
    slug: 'the-heart-of-evangelism',
    title: 'The Unstoppable Call: Evangelism in Sierra Leone',
    date: 'October 28, 2024',
    author: 'EDM Team',
    excerpt: 'Exploring Romans 10:13-15 and our deep conviction to share the Gospel across Sierra Leone. The urgency and joy of leading others to Christ.',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'sierra leone preaching gospel',
    tags: ['Evangelism', 'Great Commission', 'Sierra Leone', 'Update'],
  },
  {
    slug: 'discipleship-in-the-modern-age',
    title: 'Building Mature Disciples: The EDM Way',
    date: 'November 5, 2024',
    author: 'EDM Team',
    excerpt: 'Matthew 28:18-20 guides our approach to not just make converts, but to train believers to full maturity in Christ, ready to train others in Sierra Leone.',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'bible study group africa',
    tags: ['Discipleship', 'Mentorship', 'Christian Growth', 'Update'],
  },
  {
    slug: 'edm-campus-vision-update',
    title: 'A Vision Unfolding: Progress on the EDM Campus in Sierra Leone',
    date: 'November 12, 2024',
    author: 'EDM Leadership',
    excerpt: 'An update on land acquisition and initial plans for our ministry hub in Sierra Leone – a place for retreat, training, and outreach. Learn how you can help.',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'building plans construction africa',
    tags: ['Missions', 'Vision', 'Sierra Leone', 'Campus Project', 'Update'],
  },
  {
    slug: 'oregon-partnership-impact-story',
    title: 'Partnership Power: Oregon & Sierra Leone United for the Gospel',
    date: 'November 18, 2024',
    author: 'EDM Team',
    excerpt: 'Highlighting the vital role of our Oregon partners in prayer, support, and collaboration for the mission in Sierra Leone. A testimony of shared vision.',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'hands shaking diverse map',
    tags: ['Partnership', 'Missions', 'Oregon', 'Global Church', 'Testimony'],
  },
   {
    slug: 'van-equipment-arrival-news',
    title: 'Update: Van and Equipment Arriving Soon in Freetown!',
    date: 'September 25, 2024', // Example past date
    author: 'EDM Operations',
    excerpt: 'Exciting news! The van and musical instruments shipped in August are expected to clear customs and arrive in Freetown the first week of October. Prayer needed for smooth clearance!',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'shipping container port africa',
    tags: ['Update', 'Logistics', 'Sierra Leone', 'Prayer Request'],
  },
  {
    slug: 'customs-fee-urgent-need',
    title: 'Urgent Appeal: Help Clear Essential Ministry Tools!',
    date: 'October 2, 2024', // Example past date
    author: 'EDM Finance Team',
    excerpt: 'An urgent need has arisen: $3,500 is required to clear our recently arrived van and musical instruments from customs in Freetown. Your support is critical!',
    imageUrl: 'https://placehold.co/400x250.png',
    dataAiHint: 'donation hands help africa',
    tags: ['Urgent Need', 'Fundraising', 'Sierra Leone', 'Donation'],
  }
];

export default function NewsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM News & Updates"
        subtitle="Stay informed with the latest progress reports, event recaps, field testimonies, prayer updates, and construction milestones from our work in Sierra Leone and Oregon."
        icon={Newspaper}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map(post => (
          // Assuming BlogPostCard is flexible enough or we create a NewsItemCard
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
