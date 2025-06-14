
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, BookUser, Users, HeartHandshake, GraduationCap, Newspaper, Video, Image as ImageIcon, Mail, Phone, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const schoolImages = [
  { src: "https://code-alpha-image-gallary.vercel.app/edm-marifa2.JPG", alt: "EDM Marifa School Classroom or Event", dataAiHint: "classroom students event" },
  { src: "https://code-alpha-image-gallary.vercel.app/edm-marifa4.JPG", alt: "EDM Marifa School Community", dataAiHint: "school community" },
  { src: "https://code-alpha-image-gallary.vercel.app/edm-marifa3.JPG", alt: "EDM Marifa School Students in Uniform", dataAiHint: "students uniform" },
  { src: "https://code-alpha-image-gallary.vercel.app/edm-marifa5.JPG", alt: "EDM Marifa School Gathering", dataAiHint: "school gathering" },
  { src: "https://code-alpha-image-gallary.vercel.app/edm-marifa6.JPG", alt: "EDM Marifa School Exterior View", dataAiHint: "school exterior" },
];

export default function MarifaSchoolPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Marifa Secondary School"
        subtitle="A Beacon of Hope and Learning in koya chiefdom, port loko distrct, Sierra Leone. School Building Project ongoing."
        icon={School}
      />
      <section>
        <Card className="shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3">
             <div className="md:col-span-1 relative min-h-[250px] md:min-h-full bg-muted flex flex-col items-center justify-center p-4">
              <Image
                src="https://code-alpha-image-gallary.vercel.app/edm-school-logo.jpg" 
                alt="EDM Marifa School Logo"
                width={200} 
                height={200} 
                className="object-contain rounded-md shadow-md"
                data-ai-hint="school logo badge"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center">EDM Marifa Secondary School</p>
            </div>
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Info className="h-7 w-7 mr-3" />
                  The EDM Marifa School & Building Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  As part of the evangelism mandate given by the Lord Jesus Christ to go out and share the Gospel of Salvation to the lost, Evangelism, Discipleship, & Missions (EDM) established the EDM Marifa Secondary School and is continuing the school building project at koya chiefdom, port loko distrct. This school addresses a keenly felt need not only for Marifa Village but also for all the surrounding villages.
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
                  The EDM Marifa School is now operational, praise God! While this is a significant milestone, EDM is reaching out to you for support of the school building project to help it become a complete reality. All finances received by EDM designated for this project will be for the sole purpose of building and developing the school. We will keep you updated as the building progresses.
                </p>
                 <p className="font-semibold text-foreground">
                  We will accept one-time or monthly donations. Please remember this school building project, its students, and staff in your prayers. Thank you for your support. EDM is a registered 501(c)(3) non-profit organization.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t">
                <Link href="/donate?reason=marifa_school_project" legacyBehavior>
                  <Button>
                    <HeartHandshake className="mr-2 h-5 w-5" /> Support School Building Project
                  </Button>
                </Link>
                <div>
                  <p className="text-sm text-muted-foreground">For more information about the school project, please contact:</p>
                  <p className="text-sm font-medium text-foreground">Edwin Kargbo</p>
                  <p className="text-sm"><Phone className="inline mr-1 h-4 w-4" /> 503-505-8884</p>
                  <p className="text-sm"><Mail className="inline mr-1 h-4 w-4" /> <a href="mailto:edwinjkargbo@yahoo.com" className="text-primary hover:underline">edwinjkargbo@yahoo.com</a></p>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </section>
      <section>
        <SectionTitle title="EDM Marifa School Media & Gallery" />
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Video className="mr-2 h-6 w-6 text-primary"/> School Videos</h3>
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="aspect-video rounded-lg overflow-hidden shadow-md bg-muted">
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
                <div className="aspect-video rounded-lg overflow-hidden shadow-md bg-muted">
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
        </div>
        <div>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center"><ImageIcon className="mr-2 h-6 w-6 text-primary"/> School Photo Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {schoolImages.map((image, index) => (
                <div key={index} className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                    <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={image.dataAiHint}
                    className="hover:scale-105 transition-transform duration-300"
                    />
                </div>
                ))}
            </div>
        </div>
      </section>
      <section className="text-center py-8">
       <Link href="/donate?reason=marifa_school_project" legacyBehavior>
         <Button size="lg" variant="default">
           <HeartHandshake className="mr-2 h-5 w-5" /> Donate to Support the School Project
         </Button>
       </Link>
     </section>
    </div>
  );
}
