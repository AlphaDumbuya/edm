import PageHeader from '@/components/shared/page-header';
import { ArrowLeft, BookOpenText, CalendarDays, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// This is a dummy data structure. In a real app, you'd fetch this based on the slug.
const getArticleData = async (slug: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  if (slug === 'urgency-great-commission') {
    return {
      title: 'The Urgency of the Great Commission',
      author: 'Dr. Evelyn Reed',
      date: 'September 10, 2024',
      imageUrl: 'https://picsum.photos/seed/article1/800/400',
      dataAiHint: 'open bible map',
      content: `
        <p class="mb-4 text-lg text-muted-foreground">The Great Commission, found in Matthew 28:18-20, is not merely a suggestion but a command from Jesus Christ to His followers. It stands as the foundational mandate for the Church, urging believers to go and make disciples of all nations, baptizing them and teaching them to obey everything Christ has commanded.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Why is it Urgent?</h2>
        <p class="mb-4 text-lg text-muted-foreground">Several factors underscore the urgency of this divine assignment. Firstly, the eternal destiny of individuals hangs in the balance. Without hearing and responding to the Gospel, people remain separated from God. Secondly, time is finite. We are not guaranteed tomorrow, and opportunities to share the faith can be fleeting.</p>
        <figure class="my-6">
          <img src="https://picsum.photos/seed/article1detail/700/350" alt="Global map with connections" class="rounded-lg shadow-md mx-auto" data-ai-hint="global map connections"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">The call extends to every corner of the earth.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">Furthermore, the current global landscape, with its rapid changes, conflicts, and spiritual hunger, presents both challenges and unprecedented opportunities for evangelism. The message of hope, peace, and redemption found in Jesus is desperately needed.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Our Role in Fulfilling It</h2>
        <p class="mb-4 text-lg text-muted-foreground">Every believer has a role to play. This might involve direct evangelism, supporting missionaries, praying for unreached people groups, or using one's unique gifts and resources to advance the Kingdom. The urgency should compel us not to complacency but to active participation.</p>
        <p class="text-lg text-muted-foreground">At EDM, we are passionately committed to equipping and mobilizing believers for this vital task. We believe that by working together, under the guidance of the Holy Spirit, we can make a significant impact for God's glory.</p>
      `,
    };
  }
  return null; // Or a 404-like structure
};


export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleData(params.slug);

  if (!article) {
    return (
      <div>
        <PageHeader title="Article Not Found" icon={BookOpenText} />
        <p className="text-center text-muted-foreground">The article you are looking for does not exist or may have been moved.</p>
        <div className="text-center mt-8">
          <Link href="/content">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Content Hub</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader title={article.title} icon={BookOpenText} />
      
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground border-b pb-4 mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <UserCircle className="mr-2 h-5 w-5 text-primary" /> Author: {article.author}
        </div>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Published: {article.date}
        </div>
      </div>

      {article.imageUrl && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={article.dataAiHint}
          />
        </div>
      )}
      
      <article className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />
      
      <div className="text-center mt-12">
        <Link href="/content">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Content Hub</Button>
        </Link>
      </div>
    </div>
  );
}
