
import PageHeader from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { CardFooter, Card } from '@/components/ui/card';
import SectionTitle from '@/components/shared/section-title';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Users, BookOpen, UserCheck, Network, ArrowRight } from 'lucide-react';

const discipleshipProjects = [
  {
    title: 'EDM Bible School',
    icon: BookOpen,
    description: 'Our operational Bible school on the main EDM campus providing in-depth theological training for pastors, leaders, and missionaries in Sierra Leone.',
    link: '/ministries/discipleship/bible-school', // Update once a page exists
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/images/edm32.jpg', // Updated image URL
    dataAiHint: 'bible school africa students', // Placeholder alt text hint
  },
];

const discipleshipFocusAreas = [
  {
    title: 'Mentorship Programs',
    icon: Network,
    description:
      'Connecting mature believers with newer ones for personal guidance, accountability, and encouragement, fostering a culture of relational discipleship in Sierra Leone.',
  },
  {
    title: 'Growth Pathways',
    icon: BookOpen,
    description:
      'A structured pathway for spiritual growth, covering foundational Christian doctrines, spiritual disciplines, and practical Christian living for believers in Sierra Leone.',
  },
  {
    title: 'Training Resources',
    icon: UserCheck,
    description:
      'Developing and providing culturally relevant, Bible-based discipleship materials for individuals, small groups, and leadership training in Sierra Leone.',
  },
];

export default function DiscipleshipPage() {

  return (
    <div className="space-y-12">
      <PageHeader
        title="Discipleship Ministries"
        subtitle="Training believers to maturity in Christ and equipping them to train others in Sierra Leone."
        icon={Users}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="The Heart of Discipleship" />
          <p className="text-lg text-muted-foreground mb-4">
            At EDM, we believe that making disciples is a core component of the Great Commission (Matthew 28:18-20). Our goal is not just to see people come to faith in Sierra Leone, but to see them grow into mature, fruit-bearing followers of Jesus Christ who are equipped to disciple others. We recognized a critical need for formal training structures to nurture new converts.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://code-alpha-image-gallary.vercel.app/images/edm22.jpg"
            alt="Discipleship group studying together in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="discipleship africa study"
          />
        </div>
      </section>

      <SectionTitle
        title="Our Discipleship Approach"
        subtitle="Fostering growth and multiplication in Sierra Leone"
      />
      <div className="grid md:grid-cols-2 gap-8">
        {discipleshipProjects.map((project) => (
          <Card key={project.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-56">
              <Image src={project.imageUrl} alt={project.title} layout="fill" objectFit="cover" data-ai-hint={project.dataAiHint} />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <project.icon className="h-7 w-7 mr-3" />
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full" variant={project.link === '#' ? 'secondary' : 'default'} disabled={project.link === '#'} asChild>
                <Link href={project.link} className="w-full">
                  {project.link === '#' ? 'Coming Soon' : 'Learn More'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <SectionTitle title="Key Discipleship Focus Areas" subtitle="Building a strong foundation in faith" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Changed grid layout to fit 3 cards */}
        {discipleshipFocusAreas.map((project) => (
          <Card key={project.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
             <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <project.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

