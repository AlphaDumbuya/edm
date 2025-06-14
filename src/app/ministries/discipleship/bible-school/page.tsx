import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Lightbulb, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function BibleSchoolPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Bible School"
        subtitle="Equipping leaders for effective ministry through in-depth theological training."
        icon={BookOpen}
      />

      <section className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
        <Image
          src="https://code-alpha-image-gallary.vercel.app/images/edm32.jpg" // Placeholder image
          alt="Students studying at a Bible school"
          layout="fill"
          objectFit="cover"
          data-ai-hint="bible school students studying"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white text-center">Transforming Lives Through God's Word</h2>
        </div>
      </section>

      <SectionTitle title="Our Mission" subtitle="Training faithful servants for the harvest" />
      <div className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
        <p>
          The EDM Bible School is dedicated to providing rigorous biblical and theological education that equips men and women for faithful and effective service in God's kingdom. We aim to cultivate godly character, theological depth, and practical ministry skills.
        </p>
      </div>

      <SectionTitle title="Curriculum" subtitle="Foundational truths for powerful ministry" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Biblical Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              In-depth study of the Old and New Testaments, hermeneutics, and biblical theology to understand God's Word accurately.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Theological Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Systematic theology, church history, and Christian ethics to build a robust understanding of Christian doctrine.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Practical Theology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Homiletics, pastoral care, evangelism, missions, and church leadership for effective ministry in various contexts.
            </p>
          </CardContent>
        </Card>
      </div>

      <SectionTitle title="Faculty" subtitle="Experienced leaders guiding the next generation" />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col md:flex-row items-center shadow-lg">
          <div className="relative w-32 h-32 rounded-full overflow-hidden m-4 shrink-0">
            <Image
 src="https://code-alpha-image-gallary.vercel.app/images/pst-deee.png" // Pastor Domonic Dumbuya's image
              alt="Pastor Domonic Dumbuya"
              layout="fill"
 objectFit="cover"
              data-ai-hint="professional man portrait"
            />
          </div>
          <CardContent className="flex-grow p-4">
            <CardTitle className="text-xl">Dr. John Doe</CardTitle>
            <p className="text-sm text-muted-foreground mb-2">Pastor Domonic Dumbuya</p>
            <p className="text-sm text-muted-foreground">
 Pastor Dumbuya provides spiritual guidance and practical ministry training.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col md:flex-row items-center shadow-lg">
          <div className="relative w-32 h-32 rounded-full overflow-hidden m-4 shrink-0">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/images/pst-samuel.png" // Pastor Samuel Kargbo's image
              alt="Pastor Samuel Kargbo"
              layout="fill"
              objectFit="cover"
 data-ai-hint="pastor portrait"
            />
          </div>
          <CardContent className="flex-grow p-4">
            <CardTitle className="text-xl">Pastor Samuel Kargbo</CardTitle>
            <p className="text-sm text-muted-foreground mb-2">Pastor Samuel Kargbo</p>
            <p className="text-sm text-muted-foreground">
              Pastor Kargbo is dedicated to discipleship and theological instruction.
            </p>
          </CardContent>
        </Card>
      </div>

      <SectionTitle title="How to Apply" subtitle="Begin your journey of preparation" />
      <div className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
        <p className="mb-4">
          We welcome applications from individuals called to ministry who desire to deepen their knowledge of God's Word and be equipped for effective service.
        </p>
        <div className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">Admissions Requirements</h3>
              <p className="text-sm text-muted-foreground">
                Details about academic qualifications, faith testimony, and other necessary documents.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">Application Process</h3>
              <p className="text-sm text-muted-foreground">
                A step-by-step guide on how to submit your application.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-muted-foreground">
                Information on how to get in touch with the admissions office for inquiries.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}