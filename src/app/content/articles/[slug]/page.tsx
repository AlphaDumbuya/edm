
import PageHeader from '@/components/shared/page-header';
import { ArrowLeft, BookOpenText, CalendarDays, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// This is a dummy data structure. In a real app, you'd fetch this based on the slug.
const getArticleData = async (slug: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const articles = {
    'urgency-great-commission': {
      title: 'The Great Commission: EDM\'s Mandate in Sierra Leone',
      author: 'EDM Leadership',
      date: 'September 10, 2024',
      imageUrl: 'https://placehold.co/800x400.png',
      dataAiHint: 'sierra leone map bible',
      content: `
        <p class="mb-4 text-lg text-muted-foreground">The Great Commission, as recorded in Matthew 28:18-20, is the very heartbeat of Evangelism, Discipleship, Missions (EDM). It's not a mere suggestion but a divine command from Jesus Christ to His followers: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you." This is the foundational mandate guiding all our efforts in Sierra Leone.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Why This Urgency for Sierra Leone?</h2>
        <p class="mb-4 text-lg text-muted-foreground">The urgency is multi-faceted. Firstly, the eternal destiny of countless individuals in Sierra Leone hangs in the balance. Without hearing and responding to the Gospel, people remain separated from God. Secondly, as Romans 10:13-15 powerfully illustrates, "How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?" EDM feels deeply the call to be 'sent' into every community in Sierra Leone.</p>
        <figure class="my-6">
          <img src="https://placehold.co/700x350.png" alt="Reaching communities in Sierra Leone" class="rounded-lg shadow-md mx-auto" data-ai-hint="sierra leone people group"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">EDM is committed to reaching every corner of Sierra Leone.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">Furthermore, the current spiritual landscape in Sierra Leone presents both unique challenges and immense opportunities. We believe God is moving, and EDM is positioned to be a vessel for His work, bringing the message of hope, peace, and redemption found only in Jesus.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">EDM's Role in Fulfilling the Commission</h2>
        <p class="mb-4 text-lg text-muted-foreground">Every believer involved with EDM, whether in Sierra Leone or through our Oregon partnerships, has a role. This includes direct evangelism, robust discipleship programs that train individuals to maturity, and mission projects that serve practical needs while opening doors for the Gospel. The urgency compels us to active participation, not complacency. Our vision for a campus with a Bible school, retreat center, and more, is all geared towards more effectively fulfilling this commission.</p>
        <p class="text-lg text-muted-foreground">At EDM, we are passionately committed to equipping and mobilizing believers for this vital task in Sierra Leone. We believe that by working together, under the guidance of the Holy Spirit, we can make a significant impact for God's glory.</p>
      `,
    },
    'effective-discipleship': { // Added a new slug for the second article
      title: 'Discipleship Across Borders: Sierra Leone & Oregon Connections',
      author: 'EDM Team',
      date: 'September 15, 2024',
      imageUrl: 'https://placehold.co/800x400.png',
      dataAiHint: 'video call diverse people discussion',
      content: `
        <p class="mb-4 text-lg text-muted-foreground">True discipleship, as envisioned by EDM, transcends geographical boundaries. While our primary focus is nurturing believers in Sierra Leone to full maturity in Christ, our partnerships in Oregon, USA, play a vital role in supporting and enriching this process. The goal remains consistent: to equip individuals to become like Christ Jesus and, in turn, train others (Matthew 28:18-20).</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">The Core of EDM Discipleship</h2>
        <p class="mb-4 text-lg text-muted-foreground">EDM's discipleship strategy is born from the observation that many new converts lack formal structures for spiritual growth. We aim to provide intentional, Bible-centered training that moves believers from initial faith to deep-rooted maturity. This involves teaching them to observe all that Christ has commanded, fostering a love for God, and instilling a passion to love and serve others.</p>
        <figure class="my-6">
          <img src="https://placehold.co/700x350.png" alt="Mentorship session connecting Sierra Leone and Oregon" class="rounded-lg shadow-md mx-auto" data-ai-hint="mentor teaching online"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Connecting hearts and minds for spiritual growth.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">Our Oregon partners contribute significantly by providing resources, prayer support, and sometimes even expertise that complements our on-the-ground efforts in Sierra Leone. This transatlantic collaboration allows for a richer exchange of ideas and a broader support network for our discipleship initiatives.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Practical Steps and Future Vision</h2>
        <p class="mb-4 text-lg text-muted-foreground">Practically, this means developing culturally relevant discipleship materials, training local leaders in Sierra Leone to effectively mentor others, and fostering an environment where believers are encouraged to grow and serve. Our long-term vision for an EDM campus in Sierra Leone includes a Bible school specifically designed to deepen this discipleship training.</p>
        <p class="text-lg text-muted-foreground">Through these combined efforts, we believe we can build a strong, self-replicating movement of disciples in Sierra Leone, empowered by local leadership and supported by a global community of faith.</p>
      `,
    }
  };
  return (articles as any)[slug] || null; 
};


export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleData(params.slug);

  if (!article) {
    return (
      <div>
        <PageHeader title="Article Not Found" icon={BookOpenText} />
        <p className="text-center text-muted-foreground">The article you are looking for does not exist or may have been moved.</p>
        <div className="text-center mt-8">
          <Link href="/content" legacyBehavior>
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM Content Hub</Button>
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
        <Link href="/content" legacyBehavior>
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM Content Hub</Button>
        </Link>
      </div>
    </div>
  );
}
