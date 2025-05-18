
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, BookUser, Users, Sprout, HardHat } from 'lucide-react';
import Image from 'next/image';

export default function EducationPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Education Ministries"
        subtitle="Building futures through Christ-centered education and training in Sierra Leone."
        icon={School}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="Empowering Through Education" />
          <p className="text-lg text-muted-foreground mb-4">
            EDM believes that education is a powerful tool for transformation. Our educational initiatives aim to provide quality, Christ-centered learning opportunities that equip individuals for life, service, and leadership in Sierra Leone. This includes both formal schooling and specialized biblical training.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Children learning in a classroom in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone school children"
          />
        </div>
      </section>

      <SectionTitle title="Our Educational Focus Areas" subtitle="Investing in knowledge and faith" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <HardHat className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">School Construction Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              A key part of our campus vision is building a school to provide quality education for children in the community, integrating Christian values.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <BookUser className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Bible School (Future)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Planning for a future Bible school on the EDM campus to provide in-depth theological training for pastors, leaders, and missionaries in Sierra Leone.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Sprout className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Christian Curriculum Philosophy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Developing and implementing a curriculum that combines academic excellence with a biblical worldview, nurturing students spiritually and intellectually.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Teacher Training</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Investing in the professional and spiritual development of teachers, equipping them to effectively educate and mentor students in Sierra Leone.
            </p>
          </CardContent>
        </Card>
        {/* Add Student Enrollment Process and Volunteer Teachers cards when content is ready */}
      </div>
    </div>
  );
}
