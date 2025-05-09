import PageHeader from '@/components/shared/page-header';
import ContentCard from '@/components/content/content-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenText, MessageSquareHeart } from 'lucide-react';

const articles = [
  {
    id: 'article1',
    type: 'Article',
    title: 'The Urgency of the Great Commission',
    author: 'Dr. Evelyn Reed',
    date: 'September 10, 2024',
    excerpt: 'Understanding why the call to make disciples is more relevant today than ever before. A deep dive into Matthew 28.',
    imageUrl: 'https://picsum.photos/seed/article1/400/300',
    dataAiHint: 'open bible map',
    slug: '/content/articles/urgency-great-commission',
  },
  {
    id: 'article2',
    type: 'Article',
    title: 'Principles of Effective Discipleship',
    author: 'Maria Rodriguez',
    date: 'September 15, 2024',
    excerpt: 'Learn key strategies for mentoring and guiding new believers in their faith journey. Practical tips and biblical foundations.',
    imageUrl: 'https://picsum.photos/seed/article2/400/300',
    dataAiHint: 'mentor teaching group',
    slug: '/content/articles/effective-discipleship',
  },
];

const testimonies = [
  {
    id: 'testimony1',
    type: 'Testimony',
    title: 'From Darkness to Light: My Journey to Christ',
    author: 'John B.',
    date: 'August 5, 2024',
    excerpt: 'Read how John found hope and new life after encountering missionaries from EDM Connect during a difficult time.',
    imageUrl: 'https://picsum.photos/seed/testimony1/400/300',
    dataAiHint: 'man sunrise silhouette',
    slug: '/content/testimonies/johns-story',
  },
  {
    id: 'testimony2',
    type: 'Testimony',
    title: 'A Community Transformed in Rural Kenya',
    author: 'EDM Mission Team',
    date: 'August 20, 2024',
    excerpt: 'A powerful account of how a water well project opened doors for the Gospel, leading to lasting change in a village.',
    imageUrl: 'https://picsum.photos/seed/testimony2/400/300',
    dataAiHint: 'african village children',
    slug: '/content/testimonies/kenya-transformation',
  },
];

export default function ContentPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Content Hub"
        subtitle="Explore inspiring articles and powerful testimonies from our mission."
        icon={BookOpenText}
      />

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpenText className="h-5 w-5" /> Articles
          </TabsTrigger>
          <TabsTrigger value="testimonies" className="flex items-center gap-2">
            <MessageSquareHeart className="h-5 w-5" /> Testimonies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="articles" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="testimonies" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonies.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
