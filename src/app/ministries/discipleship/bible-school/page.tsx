import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Lightbulb, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function BibleSchoolPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <PageHeader
        title="ReGom/EDM Bible Institute"
 subtitle="A joint initiative equipping leaders for effective ministry through in-depth theological training."
        icon={BookOpen}
      />

      {/* Hero Section */}
 <div className="flex justify-center items-center space-x-8 mb-8">
 {/* EDM Logo */}
 <div className="relative w-32 h-32">
 <Image
 src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" // Replace with actual EDM logo path
 alt="EDM Logo"
 layout="fill"
 objectFit="contain"
 />
 </div>
 {/* ReGom Logo */}
 <div className="relative w-32 h-32">
 <Image
 src="https://code-alpha-image-gallary.vercel.app/images/reofrmed-logo.png" // Replace with actual ReGom logo path
 alt="ReGom Logo"
 layout="fill"
 objectFit="contain"
 />
 </div>
 </div>
      <section className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
        <Image
          src="https://code-alpha-image-gallary.vercel.app/images/edm32.jpg"
          alt="Students studying at a Bible school"
          layout="fill"
          objectFit="cover"
          data-ai-hint="bible school students studying"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white text-center">
            Transforming Lives Through God's Word
          </h2>
        </div>
      </section>

 {/* Shared Mission & Vision */}
      <SectionTitle title="Our Shared Mission and Vision" subtitle="Equipping faithful servants for global impact through collaborative theological education" />
      <div className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
        <p>
          The ReGom/EDM Bible Institute is a powerful partnership between the Reformed Gospel Mission (ReGom) and EDM, united by a shared commitment to providing robust and transformative theological education grounded in the authority of Scripture. Our joint mission is to equip men and women with the knowledge, character, and practical skills necessary for faithful service and leadership in diverse ministry contexts worldwide. Together, ReGom and EDM envision graduates who are deeply rooted in their faith, theologically sound, and passionately engaged in fulfilling the Great Commission.
        </p>
      </div>

      {/* Curriculum */}
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

      {/* Program Highlights */}
      <SectionTitle title="Program Highlights" subtitle="Distinctives of our educational experience" />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Academic Rigor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our curriculum challenges students to think critically and engage deeply with theological concepts and biblical texts.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Spiritual Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Beyond academics, we prioritize the spiritual growth and character development of our students.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Section */}
      <SectionTitle title="Faculty and Campus Admins" subtitle="Experienced leaders and instructors overseeing our campuses" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Samuel Tarawally */}
        <Card className="flex flex-col items-center text-center p-6 shadow-lg">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/tarawalley.png"
              alt="Samuel Tarawally"
              layout="fill"
              objectFit="cover"
              data-ai-hint="professional man portrait"
            />
          </div>
          <CardContent>
            <CardTitle className="text-xl">Samuel Tarawally</CardTitle>
            <CardDescription className="mb-2">Director</CardDescription>
            <p className="text-sm text-muted-foreground">
              Provides leadership and vision for the Bible School, ensuring academic and spiritual excellence.

            </p>
          </CardContent>
        </Card>

        {/* Melvin Tina */}
        <Card className="flex flex-col items-center text-center p-6 shadow-lg">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/images/melvin.png"
              alt="Melvin Tina Kamara"
              layout="fill"
              objectFit="cover"
              data-ai-hint="pastor portrait"
            />
          </div>
          <CardContent>
            <CardTitle className="text-xl">Melvin Tina</CardTitle>
            <CardDescription className="mb-2">Admin, Makeni Campus.</CardDescription>
            <p className="text-sm text-muted-foreground">
              Brings decades of teaching and mentoring experience to help students grow in biblical and theological studies.
            </p>
          </CardContent>
        </Card>

        {/* Abdul Sesay */}
        <Card className="flex flex-col items-center text-center p-6 shadow-lg">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/images/abdul-sesay.png"
              alt="Abdul Sesay"
              layout="fill"
              objectFit="cover"
              data-ai-hint="bible teacher portrait"
            />
          </div>
          <CardContent>
            <CardTitle className="text-xl">Abdul Sesay</CardTitle>
            <CardDescription className="mb-2">Admin, Freetown Campus.</CardDescription>
            <p className="text-sm text-muted-foreground">
              An experienced instructor and administrator dedicated to equipping leaders at the Freetown campus.
            </p>
          </CardContent>
        </Card>
      </div>

 {/* Admissions Section */}
 <SectionTitle title="Admissions" subtitle="Join our community of learners and grow in faith and knowledge" />
 <div className="text-muted-foreground max-w-3xl mx-auto space-y-8">
 <p className="text-center text-lg">
 We welcome individuals who are called to ministry and are seeking a comprehensive theological education grounded in Scripture. Our admissions process is designed to identify students who are not only academically capable but also demonstrate a genuine commitment to their faith and a desire to serve.
 </p>

 <SectionTitle title="Admissions Requirements" level="h3" subtitle="Criteria for prospective students" />
 <Card className="shadow-md">
 <CardContent className="p-6 space-y-4">
 <p className="text-sm text-muted-foreground">
 Prospective students must meet the following requirements to be considered for admission to the ReGom/EDM Bible Institute:
 </p>
 <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
 <li>Completed application form.</li>
 <li>Official academic transcripts from all previously attended institutions.</li>
 <li>A personal testimony of faith and calling to ministry.</li>
 <li>Two letters of recommendation (one from a pastor or spiritual leader, one from an academic or professional contact).</li>
 <li>Successful completion of any required entrance examinations or interviews.</li>
 </ul>
 </CardContent>
 </Card>

 <SectionTitle title="Application Process" level="h3" subtitle="Steps to apply" />
 <Card className="shadow-md">
 <CardContent className="p-6 space-y-4">
 <p className="text-sm text-muted-foreground">
 Follow these steps to complete your application to the ReGom/EDM Bible Institute:
 </p>
 <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
 <li>Complete and submit the <a href="/ministries/discipleship/bible-school/application" className="text-blue-600 hover:underline">online application form</a>.</li>
 <li>Request official transcripts and letters of recommendation to be sent directly to the admissions office.</li>
 <li>Participate in an interview with the admissions committee (if required).</li>
 <li>Upon acceptance, follow the instructions for enrollment and orientation.</li>
 </ol>
 </CardContent>
 </Card>

 <SectionTitle title="Tuition, Fees, and Financial Aid" level="h3" subtitle="Information on costs and financial assistance" />
 <Card className="shadow-md">
 <CardContent className="p-6">
 <p className="text-sm text-muted-foreground">
 Detailed information regarding tuition fees, administrative costs, and available financial aid options will be provided upon request or during the admissions process. We are committed to making theological education accessible and will work with students to explore potential financial assistance.
 </p>
 </CardContent>
 </Card>

        <div className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">Admissions Requirements</h3>
              <p className="text-sm text-muted-foreground text-left">
 Prospective students are required to submit a completed application form, academic transcripts, a personal testimony of faith, and letters of recommendation. Specific academic prerequisites apply depending on the chosen program track.
 </p>
 </CardContent>
 </Card>
 <Card className="shadow-md">
 <CardContent className="p-4">
 <h3 className="text-xl font-semibold mb-2">Application Process</h3>
 <p className="text-sm text-muted-foreground text-left">
 The application process involves submitting all required documents, followed by an interview with the admissions committee. Accepted applicants will receive detailed information regarding enrollment and orientation.
 </p>
 </CardContent>
 </Card>
 <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-muted-foreground text-left">
                For inquiries about programs, admission, or visits, please contact the Bible School's administrative office.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
