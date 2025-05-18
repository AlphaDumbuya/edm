
import PageHeader from '@/components/shared/page-header';
import { ArrowLeft, MessageSquareHeart, CalendarDays, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const getTestimonyData = async (slug: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const testimonies = {
    'johns-story': { // This slug can remain, but content will be EDM specific
      title: 'Transformed by Grace: A Story from Freetown',
      author: 'Adama S. (Freetown)',
      date: 'August 5, 2024',
      imageUrl: 'https://placehold.co/800x400.png',
      dataAiHint: 'woman smiling freetown',
      content: `
        <p class="mb-4 text-lg text-muted-foreground">My life in Freetown felt like it was spiraling. I was searching for meaning but found only temporary fixes. Then, one afternoon, I encountered an EDM evangelism team during a community outreach. Their message of hope and love was unlike anything I had heard before.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">A Divine Encounter</h2>
        <p class="mb-4 text-lg text-muted-foreground">They weren't just preaching; they were living out the love of Christ. They listened to my story, prayed with me, and shared about Jesus in a way that touched my heart deeply. That day, I made the decision to follow Christ, and my life has never been the same.</p>
        <figure class="my-6">
           <img src="https://placehold.co/700x350.png" alt="EDM outreach in Freetown" class="rounded-lg shadow-md mx-auto" data-ai-hint="sierra leone community help"/>
           <figcaption class="text-center text-sm text-muted-foreground mt-2">EDM's presence in Freetown brought a new beginning.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">Through EDM's discipleship program, I began to grow in my faith. I learned about God's Word, how to pray, and what it means to live a life that honors Him. The community at EDM became my family, supporting me every step of the way.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">A New Purpose</h2>
        <p class="mb-4 text-lg text-muted-foreground">Today, I am actively involved with EDM, sharing my testimony and helping others discover the same transforming grace I found. My hope is to see many more lives in Freetown and across Sierra Leone touched by the love of Jesus through the work of EDM.</p>
        <p class="text-lg text-muted-foreground">I am so grateful for EDM and their commitment to Evangelism, Discipleship, and Missions in Sierra Leone.</p>
      `,
    },
    'sierraleone-transformation': {
      title: 'A Village Renewed: EDM\'s Impact in Rural Sierra Leone',
      author: 'EDM Mission Team',
      date: 'August 20, 2024',
      imageUrl: 'https://placehold.co/800x400.png',
      dataAiHint: 'sierra leone village development',
      content: `
        <p class="mb-4 text-lg text-muted-foreground">Deep in rural Sierra Leone, the village of Mapaki faced many challenges. Access to basic resources was limited, and spiritual hope seemed distant. When the EDM mission team first visited, our goal was twofold: to meet practical needs and share the life-giving message of Jesus Christ.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Missions in Action: More Than Words</h2>
        <p class="mb-4 text-lg text-muted-foreground">Our approach to missions is holistic. We believe in demonstrating God's love through tangible acts of service. In Mapaki, this involved partnering with the community on a small project, which opened doors for conversations about faith. We shared meals, listened to their stories, and slowly built trust.</p>
        <figure class="my-6">
           <img src="https://placehold.co/700x350.png" alt="EDM team working with villagers in Sierra Leone" class="rounded-lg shadow-md mx-auto" data-ai-hint="sierra leone community project team"/>
           <figcaption class="text-center text-sm text-muted-foreground mt-2">Serving the community paved the way for the Gospel.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">As relationships grew, we began sharing the Gospel message. We held evening gatherings, showed the "Jesus" film, and offered Bibles. Many hearts were touched, and a small group of believers began to form, eager to learn more about Jesus.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Lasting Change through Discipleship</h2>
        <p class="mb-4 text-lg text-muted-foreground">The transformation in Mapaki is a testament to EDM's commitment to Evangelism, Discipleship, and Missions. Today, there is a growing fellowship of believers, and EDM continues to support them through discipleship training and leadership development. The village is experiencing not only spiritual renewal but also a newfound sense of hope and community.</p>
        <p class="text-lg text-muted-foreground">We are grateful for the prayers and support from our partners, including those in Oregon, which make such mission endeavors possible in Sierra Leone.</p>
      `,
    }
  };
  return (testimonies as any)[slug] || null;
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
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM Content Hub</Button>
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
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM Content Hub</Button>
        </Link>
      </div>
    </div>
  );
}
