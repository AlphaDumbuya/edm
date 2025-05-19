
import PageHeader from '@/components/shared/page-header';
import { ArrowLeft, Newspaper, CalendarDays, User, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Updated dummy data structure for EDM News/Updates
const getNewsPostData = async (slug: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  const posts = {
    'the-heart-of-evangelism': {
      title: 'The Unstoppable Call: Evangelism in Sierra Leone',
      author: 'EDM Team',
      date: 'October 28, 2024',
      imageUrl: 'https://source.unsplash.com/random/800x400/?sierra,leone,preaching,crowd',
      dataAiHint: 'sierra leone preaching crowd',
      tags: ['Evangelism', 'Great Commission', 'Sierra Leone', 'Update'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">The heart of EDM beats with a passion for evangelism. We are driven by the words of Romans 10:13-15: "For everyone who calls on the name of the Lord will be saved. How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? And how are they to preach unless they are sent?" This is why EDM exists – to be sent, to preach, and to see lives transformed by the Gospel in Sierra Leone.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Our Mandate and Motivation</h2>
        <p class="mb-4 text-lg text-muted-foreground">Our commitment to evangelism stems from a deep understanding of God's love and the urgency of the Great Commission. We believe that every person deserves the opportunity to hear the life-changing message of Jesus Christ. Our efforts are not confined to church walls; we actively go out into communities, marketplaces, and villages, employing various methods, including open-air meetings and showings of the "Jesus" film, to reach those who have not yet heard.</p>
        <figure class="my-6">
          <img src="https://source.unsplash.com/random/700x350/?evangelism,outreach,africa" alt="Evangelism outreach in Sierra Leone" class="rounded-lg shadow-md mx-auto" data-ai-hint="evangelism outreach africa"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Taking the Gospel to every corner of Sierra Leone.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">We see evangelism not as an event, but as a continuous lifestyle of sharing God's love. This involves building relationships, understanding the local culture, and presenting the Gospel in a way that is relevant and clear. Our Oregon partners play a crucial role in supporting these evangelistic endeavors through prayer, resources, and collaborative efforts.</p>
      `,
    },
     'discipleship-in-the-modern-age': {
      title: 'Building Mature Disciples: The EDM Way',
      author: 'EDM Team',
      date: 'November 5, 2024',
      imageUrl: 'https://source.unsplash.com/random/800x400/?mentoring,group,africa,christian',
      dataAiHint: 'mentoring group africa',
      tags: ['Discipleship', 'Mentorship', 'Christian Growth', 'Update'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">At EDM, discipleship is more than just a program; it's the core of our mission to build a strong, vibrant church in Sierra Leone. We are guided by Matthew 28:18-20, where Jesus commands us not only to make disciples but to "teach them to observe all that I have commanded you." Our goal is to see new believers grow into mature followers of Christ, equipped to then train others.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">From Conversion to Maturity</h2>
        <p class="mb-4 text-lg text-muted-foreground">We recognized a critical need for formal training structures to help new converts grow in their faith. It's not enough for someone to accept Christ; they need ongoing support, teaching, and mentorship to develop a deep, resilient faith. EDM's discipleship pathway focuses on foundational biblical truths, spiritual disciplines, and practical Christian living.</p>
      `
    },
    'edm-campus-vision-update': {
      title: 'A Vision Unfolding: Progress on the EDM Campus in Sierra Leone',
      author: 'EDM Leadership',
      date: 'November 12, 2024',
      imageUrl: 'https://source.unsplash.com/random/800x400/?land,development,africa,construction',
      dataAiHint: 'land development africa',
      tags: ['Missions', 'Vision', 'Sierra Leone', 'Campus Project', 'Update'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">We are thrilled to share updates on our vision for the EDM Campus in Sierra Leone. Land has been acquired, and we are moving forward with plans for a retreat center, school, and other facilities. This project is central to our long-term strategy for evangelism, discipleship, and missions in the region.</p>
        <p class="mb-4 text-lg text-muted-foreground">Read more about the specific goals and how you can be a part of building this vital ministry hub.</p>
      `
    },
    'oregon-partnership-impact-story': {
        title: 'Partnership Power: Oregon & Sierra Leone United for the Gospel',
        author: 'EDM Team',
        date: 'November 18, 2024',
        imageUrl: 'https://source.unsplash.com/random/800x400/?global,partnership,diverse,team,collaboration',
        dataAiHint: 'global partnership diverse team',
        tags: ['Partnership', 'Missions', 'Oregon', 'Global Church', 'Testimony'],
        content: `
        <p class="mb-4 text-lg text-muted-foreground">The collaboration between our team in Sierra Leone and our dedicated partners in Oregon is a testament to the power of unity in the body of Christ. This post shares a recent story of how this partnership directly impacted an outreach effort, providing essential resources and prayer support that led to significant breakthroughs.</p>
        <p class="mb-4 text-lg text-muted-foreground">Discover how God is using this transatlantic connection to further His kingdom in West Africa.</p>
        `
    },
    'van-equipment-arrival-news': {
      title: 'Update: Van and Equipment Arriving Soon in Freetown!',
      author: 'EDM Operations',
      date: 'September 25, 2024',
      imageUrl: 'https://source.unsplash.com/random/800x400/?cargo,ship,port,container',
      dataAiHint: 'cargo ship port',
      tags: ['Update', 'Logistics', 'Sierra Leone', 'Prayer Request'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">We are excited to announce that the van and musical instruments shipped from our Oregon partners in August are expected to arrive in Freetown during the first week of October! These tools are absolutely vital for our evangelistic outreaches, "Jesus" film showings, and for transporting ministry teams across Sierra Leone.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">Prayer for Smooth Process</h2>
        <p class="mb-4 text-lg text-muted-foreground">Please join us in prayer for a smooth and swift customs clearance process and for the resources needed for their deployment. These tools are not luxuries but necessities for the work God has called us to. Your support in this area is greatly appreciated. See our <a href="/donate" class="text-primary hover:underline">donate page</a> for how you can help.</p>
      `
    },
    'edm-marifa-school-operational': {
      title: 'EDM Marifa School: Now Operating in Rosortta Village!',
      author: 'EDM Education Department',
      date: 'October 15, 2024',
      imageUrl: 'https://code-alpha-image-gallary.vercel.app/edm-marifa1.JPG',
      dataAiHint: 'school students sierra leone',
      tags: ['Education', 'Marifa School', 'Sierra Leone', 'Update', 'Milestone'],
      content: `
        <p class="mb-4 text-lg text-muted-foreground">We are overjoyed to announce that the EDM Marifa Secondary School in Rosortta Village is now operational! This is a significant milestone in our mission to provide quality, Christ-centered education to the children of Sierra Leone.</p>
        <h2 class="text-2xl font-semibold my-4 text-foreground">A Beacon of Hope and Learning</h2>
        <p class="mb-4 text-lg text-muted-foreground">The school is already making a difference, offering a safe learning environment and sharing the Gospel with students from Marifa and surrounding villages. We are deeply grateful for all the prayers and support that have made this possible.</p>
        <figure class="my-6">
          <img src="https://code-alpha-image-gallary.vercel.app/edm-marifa2.JPG" alt="EDM Marifa School Students" class="rounded-lg shadow-md mx-auto" data-ai-hint="sierra leone classroom students"/>
          <figcaption class="text-center text-sm text-muted-foreground mt-2">Students at the EDM Marifa School.</figcaption>
        </figure>
        <p class="mb-4 text-lg text-muted-foreground">Ongoing support is crucial for the school's continued success and development, including resources for students, staff, and facility improvements. Learn more about how you can contribute by visiting our <a href="/ministries/education/marifa-school" class="text-primary hover:underline">EDM Marifa School page</a> or our <a href="/donate" class="text-primary hover:underline">donation page</a>.</p>
      `
    }
  };
  return (posts as any)[slug] || null;
};

export default async function NewsPostPage({ params }: { params: { slug:string } }) {
  const post = await getNewsPostData(params.slug);

  if (!post) {
    return (
      <div>
        <PageHeader title="News Post Not Found" icon={Newspaper} />
        <p className="text-center text-muted-foreground">The news post you are looking for does not exist or may have been moved.</p>
        <div className="text-center mt-8">
          <Link href="/news" legacyBehavior>
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM News & Updates</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader title={post.title} icon={Newspaper} />
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
        <Link href="/news" legacyBehavior>
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to EDM News & Updates</Button>
        </Link>
      </div>
    </div>
  );
}
