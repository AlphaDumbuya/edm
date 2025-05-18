
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, BookUser, Users, Sprout, HardHat, Mail, Phone, HeartHandshake, GraduationCap, Newspaper, Video, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EducationPage() {
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
            A key achievement in this area is the EDM Marifa Secondary School, now operating in Marifa.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-80 relative">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Students at EDM Marifa School in Sierra Leone"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sierra leone school students"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="EDM Marifa Secondary School - Now Operating!" subtitle="A Beacon of Hope and Learning in Marifa, Sierra Leone" />
        <Card className="shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-1 relative min-h-[250px] md:min-h-full">
              <Image
                src="https://placehold.co/600x800.png" // Placeholder for actual school image
                alt="EDM Marifa School building or students"
                layout="fill"
                objectFit="cover"
                data-ai-hint="marifa school building students"
              />
            </div>
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <School className="h-7 w-7 mr-3" />
                  EDM Marifa Secondary School
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  As part of the evangelism mandate given by the Lord Jesus Christ to go out and share the Gospel of Salvation to the lost, Evangelism, Discipleship, & Missions (EDM) proudly operates the EDM Marifa Secondary School in Marifa, Sierra Leone. This school addresses a keenly felt need not only for Marifa Village but also for all the surrounding villages.
                </p>
                <p>
                  The purpose of the EDM Marifa School is multifaceted:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-foreground">
                  <li><GraduationCap className="inline h-4 w-4 mr-2 text-primary" /> To provide quality secondary education for pupils in the community.</li>
                  <li><BookUser className="inline h-4 w-4 mr-2 text-primary" /> To be a center for sharing the Gospel of Jesus Christ.</li>
                  <li><Users className="inline h-4 w-4 mr-2 text-primary" /> To foster Christian fellowship and community engagement.</li>
                </ul>
                <p className="font-semibold text-foreground">
                  While the school is operational, ongoing support is vital for its continued success and expansion. EDM is reaching out to you for support for the EDM Marifa School. All finances received by EDM designated for this school will be for the sole purpose of its operation and development. We will keep you updated on its progress and impact.
                </p>
                 <p className="font-semibold text-foreground">
                  We will accept one-time or monthly donations. Please remember the EDM Marifa School, its students, and staff in your prayers. Thank you for your support.
                </p>
                <div className="mt-4 pt-4 border-t">
                    <h4 className="text-md font-semibold text-foreground mb-3">School Media</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/HmiDIV_6JJA"
                                title="EDM Marifa School Video 1"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                             <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/ieD1noKUz0A"
                                title="EDM Marifa School Video 2"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">More photos and updates coming soon.</p>
                    {/* Placeholder for badge - we can add an Image tag here later */}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t">
                <Link href="/donate?reason=marifa_school_support">
                  <Button>
                    <HeartHandshake className="mr-2 h-5 w-5" /> Support EDM Marifa School
                  </Button>
                </Link>
                <div>
                  <p className="text-sm text-muted-foreground">For more information, please contact:</p>
                  <p className="text-sm font-medium text-foreground">Rev. Edwin Kargbo</p>
                  <p className="text-sm"><Phone className="inline mr-1 h-4 w-4" /> 503-505-8884</p>
                  <p className="text-sm"><Mail className="inline mr-1 h-4 w-4" /> <a href="mailto:edwinjkargbo@yahoo.com" className="text-primary hover:underline">edwinjkargbo@yahoo.com</a></p>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </section>

      <SectionTitle title="Other Educational Focus Areas" subtitle="Investing in knowledge and faith beyond Marifa" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <BookUser className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Bible School (Future)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Planning for a future Bible school on the main EDM campus to provide in-depth theological training for pastors, leaders, and missionaries in Sierra Leone.
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
              Developing and implementing a curriculum that combines academic excellence with a biblical worldview, nurturing students spiritually and intellectually across all EDM educational initiatives.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Teacher Training & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Investing in the professional and spiritual development of teachers for schools like EDM Marifa, equipping them to effectively educate and mentor students.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
             <School className="h-8 w-8 text-primary"/>
            </div>
            <CardTitle className="text-center">Student Enrollment & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
             Providing information on student enrollment processes for EDM Marifa School and seeking support for student scholarships where needed.
            </p>
             <div className="text-center mt-3">
                <Link href="/contact?subject=Marifa_School_Enrollment">
                    <Button variant="outline" size="sm">Enrollment Info</Button>
                </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
             <HeartHandshake className="h-8 w-8 text-primary"/>
            </div>
            <CardTitle className="text-center">Volunteer Teachers & Educators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Opportunities for qualified educators to volunteer their expertise at EDM Marifa School or other educational initiatives. Contact us to express interest.
            </p>
            <div className="text-center mt-3">
                <Link href="/get-involved/volunteer">
                    <Button variant="outline" size="sm">Volunteer Info</Button>
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

