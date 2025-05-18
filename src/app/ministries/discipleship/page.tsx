
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, UserCheck, Network } from 'lucide-react';
import Image from 'next/image';

export default function DiscipleshipPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Discipleship Ministries"
        subtitle="Training believers to maturity in Christ and equipping them to train others."
        icon={Users}
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle title="The Heart of Discipleship" />
          <p className="text-lg text-muted-foreground mb-4">
            At EDM, we believe that making disciples is a core component of the Great Commission (Matthew 28:18-20). Our goal is not just to see people come to faith, but to see them grow into mature, fruit-bearing followers of Jesus Christ who are equipped to disciple others. We recognized a critical need for formal training structures to nurture new converts.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Discipleship group studying together"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone bible study group"
          />
        </div>
      </section>

      <SectionTitle title="Our Discipleship Approach" subtitle="Fostering growth and multiplication in Sierra Leone" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Discipleship Training Path</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              A structured pathway for spiritual growth, covering foundational Christian doctrines, spiritual disciplines, and practical Christian living for believers in Sierra Leone.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Curriculum & Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Developing and providing culturally relevant, Bible-based discipleship materials for individuals, small groups, and leadership training in Sierra Leone.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Network className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Mentorship Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Connecting mature believers with newer ones for personal guidance, accountability, and encouragement, fostering a culture of relational discipleship.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
