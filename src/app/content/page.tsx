
import PageHeader from '@/components/shared/page-header';
import ContentCard from '@/components/content/content-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenText, MessageSquareHeart } from 'lucide-react';

const articles = [
  {
    id: 'article1',
    type: 'Article',
    title: 'The Great Commission: EDM\'s Mandate in Sierra Leone',
    author: 'EDM Leadership',
    date: 'September 10, 2024',
    excerpt: 'Understanding Matthew 28:18-20 and its driving force behind EDM\'s commitment to Evangelism, Discipleship, and Missions in Sierra Leone.',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'sierra leone bible study',
    slug: '/content/articles/urgency-great-commission', 
  },
  {
    id: 'article2',
    type: 'Article',
    title: 'Discipleship Across Borders: Sierra Leone & Ohio Connections',
    author: 'EDM Team',
    date: 'September 15, 2024',
    excerpt: 'Exploring effective strategies for mentoring and spiritual growth, linking believers in Sierra Leone with support from our Ohio partners for a global impact.',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'diverse people video call prayer',
    slug: '/content/articles/effective-discipleship', 
  },
];

const testimonies = [
  {
    id: 'testimony1',
    type: 'Testimony',
    title: 'Transformed by Grace: A Story from Freetown',
    author: 'Adama S. (Freetown)',
    date: 'August 5, 2024',
    excerpt: 'Read how an encounter with an EDM evangelism team in Freetown led Adama to new hope and purpose in Christ.',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'smiling woman sierra leone',
    slug: '/content/testimonies/johns-story', // Slug can remain generic; content will be specific
  },
  {
    id: 'testimony2',
    type: 'Testimony',
    title: 'A Community Touched: EDM\'s Outreach in Rural Sierra Leone',
    author: 'EDM Mission Team',
    date: 'August 20, 2024',
    excerpt: 'A powerful account of how an EDM mission project brought not just practical help but the life-changing Gospel to a remote village in Sierra Leone.',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'sierra leone village children playing',
    slug: '/content/testimonies/sierraleone-transformation',
  },
];

export default function ContentPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Content Hub"
        subtitle="Explore inspiring articles and powerful testimonies from EDM's mission in Sierra Leone."
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
