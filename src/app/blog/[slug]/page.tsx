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
      title: 'The Heart of Evangelism: More Than Just Words',
      author: 'Pastor Samuel Green',
      date: 'October 1, 2024',
      imageUrl: 'https://picsum.photos/seed/blogpost1/800/400',
      dataAiHint: 'open bible heart',
      tags: ['Evangelism', 'Faith', 'Ministry'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">Evangelism is often misunderstood. For some, it conjures images of street preaching or confrontational encounters. While these methods have their place, the true heart of evangelism lies in a much deeper, more relational approach. It's about genuinely caring for people, listening to their stories, and sharing the hope of Jesus in a way that resonates with their lives.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Love as the Foundation</h2>
        <p class="mb-4 text-lg text-muted-foreground">1 Corinthians 13 reminds us that without love, our words and actions are meaningless. This is paramount in evangelism. If our efforts to share the Gospel are not rooted in sincere love for the individual, they will likely fall on deaf ears. People are more open to hearing about our faith when they feel genuinely seen, heard, and cared for.</p>
        <figure class="my-6">
          <img src="https://picsum.photos/seed/blogdetail1/700/350" alt="People connecting" class="rounded-lg shadow-md mx-auto" data-ai-hint="people connection discussion"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Building bridges of relationship is key.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">This means taking the time to build relationships, understand different perspectives, and be present in people's lives. It's about living out our faith authentically, allowing Christ's love to shine through us.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">It's a Journey, Not a Transaction</h2>
        <p class="mb-4 text-lg text-muted-foreground">Evangelism isn't a one-time event or a sales pitch. It's often a journey of walking alongside someone as they explore faith. This requires patience, prayer, and a willingness to answer tough questions with grace. Our role is to plant seeds and water them; God brings the growth.</p>
        <p class="text-lg text-muted-foreground">At EDM Connect, we equip believers to share their faith naturally and lovingly, emphasizing the importance of authentic relationships and compassionate outreach. Let's redefine evangelism by leading with love.</p>
      `,
    },
    // Add other blog posts here if needed for testing
  };
  return (posts as any)[slug] || null;
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostData(params.slug);

  if (!post) {
    return (
      <div>
        <PageHeader title="Blog Post Not Found" icon={BookOpen} />
        <p className="text-center text-muted-foreground">The blog post you are looking for does not exist or may have been moved.</p>
        <div className="text-center mt-8">
          <Link href="/blog">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Button>
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
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <div className="text-center mt-12">
        <Link href="/blog">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Button>
        </Link>
      </div>
    </div>
  );
}
