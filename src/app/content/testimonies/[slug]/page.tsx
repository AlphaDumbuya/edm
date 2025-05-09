import PageHeader from '@/components/shared/page-header';
import { ArrowLeft, MessageSquareHeart, CalendarDays, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const getTestimonyData = async (slug: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (slug === 'johns-story') {
    return {
      title: 'From Darkness to Light: My Journey to Christ',
      author: 'John B.',
      date: 'August 5, 2024',
      imageUrl: 'https://picsum.photos/seed/testimony1/800/400',
      dataAiHint: 'man sunrise silhouette',
      content: `
        <p class="mb-4 text-lg text-muted-foreground">My life was a mess. I felt lost, alone, and without purpose. I had tried everything to fill the void in my heart, but nothing worked. Addiction had taken over, and I had pushed away everyone who cared about me.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">A Glimmer of Hope</h2>
        <p class="mb-4 text-lg text-muted-foreground">One evening, at my lowest point, I wandered into a community event hosted by EDM missionaries. I didn't know what to expect, but I was desperate. They welcomed me with open arms, offering food and a listening ear without judgment.</p>
        <figure class="my-6">
           <img src="https://picsum.photos/seed/testimony1detail/700/350" alt="Hands reaching out" class="rounded-lg shadow-md mx-auto" data-ai-hint="hands reaching out"/>
           <figcaption class="text-center text-sm text-muted-foreground mt-2">A hand of friendship changed everything.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">That night, I heard the Gospel message for the first time in a way that resonated deep within me. It wasn't about rules or religion; it was about a loving God who offered forgiveness and a new beginning. For the first time in years, I felt a glimmer of hope.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">A New Life</h2>
        <p class="mb-4 text-lg text-muted-foreground">I decided to give my life to Christ that night. The journey hasn't been easy, but with the support of the EDM team and my new church family, I've found freedom from addiction, reconciliation with my family, and a profound sense of purpose. God's love has truly transformed me from darkness to light.</p>
        <p class="text-lg text-muted-foreground">I am now actively involved in ministry, sharing my story to help others find the same hope I found. My life is a testament to God's amazing grace and the incredible work of EDM.</p>
      `,
    };
  }
  return null;
};

export default async function TestimonyPage({ params }: { params: { slug: string } }) {
  const testimony = await getTestimonyData(params.slug);

  if (!testimony) {
    return (
      <div>
        <PageHeader title="Testimony Not Found" icon={MessageSquareHeart} />
        <p className="text-center text-muted-foreground">The testimony you are looking for does not exist or may have been moved.</p>
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
      <PageHeader title={testimony.title} icon={MessageSquareHeart} />
      
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground border-b pb-4 mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <UserCircle className="mr-2 h-5 w-5 text-primary" /> Shared by: {testimony.author}
        </div>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Date: {testimony.date}
        </div>
      </div>

      {testimony.imageUrl && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={testimony.imageUrl}
            alt={testimony.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={testimony.dataAiHint}
          />
        </div>
      )}
      
      <article className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: testimony.content }} />
      
      <div className="text-center mt-12">
        <Link href="/content">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Content Hub</Button>
        </Link>
      </div>
    </div>
  );
}
