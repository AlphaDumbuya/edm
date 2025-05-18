
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, BookUser, Users, Sprout, GraduationCap, ArrowRight, Building } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const educationProjects = [
  {
    title: 'EDM Marifa Secondary School',
    icon: School,
    description: 'Our operational secondary school in Marifa (Rosortta Village), providing quality education and sharing the Gospel with pupils from surrounding communities.',
    link: '/ministries/education/marifa-school',
    imageUrl: 'https://code-alpha-image-gallary.vercel.app/edm-marifa1.JPG',
    dataAiHint: 'sierra leone school students',
  },
  {
    title: 'Future Bible School',
    icon: Building,
    description: 'Planning for a future Bible school on the main EDM campus to provide in-depth theological training for pastors, leaders, and missionaries in Sierra Leone.',
    link: '#', // Update once a page exists
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bible study leadership training',
  },
];

const otherFocusAreas = [
    {
    title: 'Christian Curriculum Philosophy',
    icon: Sprout,
    description: 'Developing and implementing a curriculum that combines academic excellence with a biblical worldview, nurturing students spiritually and intellectually.',
  },
  {
    title: 'Teacher Training & Support',
    icon: Users,
    description: 'Investing in the professional and spiritual development of teachers, equipping them to effectively educate and mentor students.',
  },
];

export default function EducationOverviewPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Education Ministries"
        subtitle="Building futures through Christ-centered education and training in Sierra Leone."
        icon={GraduationCap}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Empowering Through Education" />
          <p className="text-lg text-muted-foreground mb-4">
            Evangelism, Discipleship, Missions (EDM) believes that education is a powerful tool for transformation. Our educational initiatives aim to provide quality, Christ-centered learning opportunities that equip individuals for life, service, and leadership in Sierra Leone. This includes formal schooling and specialized biblical training.
          </p>
           <p className="text-lg text-muted-foreground">
            We are committed to establishing educational centers that not only impart knowledge but also instill godly character and a passion for serving Christ and community.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://placehold.co/600x400.png" 
            alt="Students engaged in learning in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone students classroom"
          />
        </div>
      </section>

      <SectionTitle title="Our Educational Projects & Focus" subtitle="Impacting lives through knowledge and faith" />
      <div className="grid md:grid-cols-2 gap-8">
        {educationProjects.map((project) => (
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
              <Link href={project.link} className="w-full">
                <Button className="w-full" variant={project.link === '#' ? 'secondary' : 'default'} disabled={project.link === '#'}>
                  {project.link === '#' ? 'Coming Soon' : 'Learn More'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <SectionTitle title="Other Educational Focus Areas" subtitle="Investing in holistic Christian education" />
      <div className="grid md:grid-cols-2 gap-8">
        {otherFocusAreas.map((area) => (
            <Card key={area.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <area.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center">{area.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                {area.description}
                </p>
            </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
