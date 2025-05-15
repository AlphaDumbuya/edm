
import PageHeader from '@/components/shared/page-header';
import { ArrowLeft, BookOpen, CalendarDays, User, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dummy data structure. In a real app, you'd fetch this based on the slug.
const getBlogPostData = async (slug: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const posts = {
    'the-heart-of-evangelism': {
      title: 'The Unstoppable Call: Evangelism in Sierra Leone',
      author: 'EDM Team',
      date: 'October 1, 2024',
      imageUrl: 'https://placehold.co/800x400.png',
      dataAiHint: 'sierra leone preaching crowd',
      tags: ['Evangelism', 'Great Commission', 'Sierra Leone'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">The heart of EDM beats with a passion for evangelism. We are driven by the words of Romans 10:13-15: "For everyone who calls on the name of the Lord will be saved. How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?" This is why EDM exists – to be sent, to preach, and to see lives transformed by the Gospel in Sierra Leone.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Our Mandate and Motivation</h2>
        <p class="mb-4 text-lg text-muted-foreground">Our commitment to evangelism stems from a deep understanding of God's love and the urgency of the Great Commission. We believe that every person deserves the opportunity to hear the life-changing message of Jesus Christ. Our efforts are not confined to church walls; we actively go out into communities, marketplaces, and villages, employing various methods, including open-air meetings and showings of the "Jesus" film, to reach those who have not yet heard.</p>
        <figure class="my-6">
          <img src="https://placehold.co/700x350.png" alt="Evangelism outreach in Sierra Leone" class="rounded-lg shadow-md mx-auto" data-ai-hint="evangelism outreach africa"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Taking the Gospel to every corner of Sierra Leone.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">We see evangelism not as an event, but as a continuous lifestyle of sharing God's love. This involves building relationships, understanding the local culture, and presenting the Gospel in a way that is relevant and clear. Our Ohio partners play a crucial role in supporting these evangelistic endeavors through prayer, resources, and collaborative efforts.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">The Joy of Transformation</h2>
        <p class="mb-4 text-lg text-muted-foreground">There is no greater joy than witnessing a life transformed by the power of the Holy Spirit. Each testimony of salvation fuels our passion and reinforces our commitment. We invite you to partner with us in this vital work of evangelism in Sierra Leone. Together, we can make an eternal difference.</p>
      `,
    },
     'discipleship-in-the-modern-age': {
      title: 'Building Mature Disciples: The EDM Way',
      author: 'EDM Team',
      date: 'October 5, 2024',
      imageUrl: 'https://placehold.co/800x400.png',
      dataAiHint: 'mentoring group africa',
      tags: ['Discipleship', 'Mentorship', 'Christian Growth'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">At EDM, discipleship is more than just a program; it's the core of our mission to build a strong, vibrant church in Sierra Leone. We are guided by Matthew 28:18-20, where Jesus commands us not only to make disciples but to "teach them to observe all that I have commanded you." Our goal is to see new believers grow into mature followers of Christ, equipped to then train others.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">From Conversion to Maturity</h2>
        <p class="mb-4 text-lg text-muted-foreground">We recognized a critical need for formal training structures to help new converts grow in their faith. It's not enough for someone to accept Christ; they need ongoing support, teaching, and mentorship to develop a deep, resilient faith. EDM's discipleship pathway focuses on foundational biblical truths, spiritual disciplines, and practical Christian living.</p>
        <figure class="my-6">
          <img src="https://placehold.co/700x350.png" alt="Discipleship group in Sierra Leone" class="rounded-lg shadow-md mx-auto" data-ai-hint="bible study small group"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Nurturing believers to become like Christ.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">Our discipleship programs are designed to be relational and reproducible. We train local leaders who can then mentor and disciple others within their own communities. This approach, supported by resources and collaboration with our Ohio partners, ensures that the discipleship process is sustainable and culturally relevant.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">The Ripple Effect of Discipleship</h2>
        <p class="mb-4 text-lg text-muted-foreground">When believers are properly discipled, they become active participants in God's mission. They grow in their love for God and others, share their faith confidently, and serve their communities. This ripple effect is how the church grows and society is transformed. Join us in this crucial work of making and maturing disciples in Sierra Leone.</p>
      `,
    },
    // Add other blog posts here if needed for testing
  };
  return (posts as any)[slug] || null;
};

export default async function BlogPostPage({ params }: { params: { slug:string } }) {
  const post = await getBlogPostData(params.slug);

  if (!post) {
    return (
      <div>
        <PageHeader title="Blog Post Not Found" icon={BookOpen} />
        <p className="text-center text-muted-foreground">The blog post you are looking for does not exist or may have been moved.</p>
        <div className="text-center mt-8">
          <Link href="/blog">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader title={post.title} icon={BookOpen} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-muted-foreground border-b pb-4 mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <User className="mr-2 h-5 w-5 text-primary" /> By: {post.author}
        </div>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Published: {post.date}
        </div>
      </div>

      {post.imageUrl && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={post.dataAiHint}
          />
        </div>
      )}
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center mb-6">
          <Tag className="h-5 w-5 text-primary" />
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <div className="text-center mt-12">
        <Link href="/blog">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM Blog</Button>
        </Link>
      </div>
    </div>
  );
}
