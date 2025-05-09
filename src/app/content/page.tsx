import PageHeader from '@/components/shared/page-header';
import ContentCard from '@/components/content/content-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenText, MessageSquareHeart } from 'lucide-react';

const articles = [
  {
    id: 'article1',
    type: 'Article',
    title: 'The Great Commission: Our Call in Sierra Leone',
    author: 'Dr. Evelyn Reed',
    date: 'September 10, 2024',
    excerpt: 'Understanding why the call to make disciples is deeply relevant to our context in Sierra Leone. A look at Matthew 28.',
    imageUrl: 'https://picsum.photos/seed/articleSL1/400/300',
    dataAiHint: 'sierra leone bible map',
    slug: '/content/articles/urgency-great-commission', // Slug can remain general
  },
  {
    id: 'article2',
    type: 'Article',
    title: 'Discipleship: Ohio to Freetown & Back',
    author: 'Maria Rodriguez',
    date: 'September 15, 2024',
    excerpt: 'Key strategies for mentoring across cultures, guiding believers in Sierra Leone with support from our Ohio partners.',
    imageUrl: 'https://picsum.photos/seed/articleOH1/400/300',
    dataAiHint: 'mentor teaching diverse group',
    slug: '/content/articles/effective-discipleship', // Slug can remain general
  },
];

const testimonies = [
  {
    id: 'testimony1',
    type: 'Testimony',
    title: 'Finding Light in Freetown: John\'s Story',
    author: 'John B. (Sierra Leone)',
    date: 'August 5, 2024',
    excerpt: 'Read how John found hope after encountering EDM missionaries in Freetown during a challenging time in his life.',
    imageUrl: 'https://picsum.photos/seed/testimonySL1/400/300',
    dataAiHint: 'man freetown sunrise',
    slug: '/content/testimonies/johns-story',
  },
  {
    id: 'testimony2',
    type: 'Testimony',
    title: 'A Village Transformed in Rural Sierra Leone',
    author: 'EDM Mission Team (SL)',
    date: 'August 20, 2024',
    excerpt: 'A powerful account of how a clean water project in Sierra Leone opened doors for the Gospel, leading to lasting change.',
    imageUrl: 'https://picsum.photos/seed/testimonySL2/400/300',
    dataAiHint: 'sierra leone village children water',
    slug: '/content/testimonies/sierraleone-transformation', // Updated slug
  },
];

export default function ContentPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Content Hub"
        subtitle="Explore inspiring articles and powerful testimonies from our mission in Sierra Leone and Ohio."
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

