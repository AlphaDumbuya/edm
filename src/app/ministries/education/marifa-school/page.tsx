"use client";

import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, BookUser, Users, HeartHandshake, GraduationCap, Newspaper, Video, Image as ImageIcon, Mail, Phone, Info, Calendar, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const schoolImages = [
  { src: "https://code-alpha-image-gallary.vercel.app/edm-marifa2.JPG", alt: "EDM Marifa School Classroom or Event", dataAiHint: "classroom students event" },
  { src: "https://code-alpha-image-gallary.vercel.app/edm-marifa4.JPG", alt: "EDM Marifa School Community", dataAiHint: "school community" },
];

export default function MarifaSchoolPage() {
  const [galleryTab, setGalleryTab] = useState<'images' | 'videos'>('images');

  return (
    <div className="space-y-12 w-full max-w-none px-2 sm:px-4 md:px-8 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg p-2 sm:p-4 flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-8 w-full gap-4 md:gap-6">
        <div className="flex-1 w-full min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-2 break-words leading-tight">
            Marifa Secondary School: Empowering the Next Generation
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mb-4">
            Providing quality secondary education and Christian values to students in Koya Chiefdom, Port Loko District, Sierra Leone.
          </p>
        </div>
        <Image
          src="https://code-alpha-image-gallary.vercel.app/edm-school-logo.jpg"
          alt="EDM Marifa School Logo"
          width={100}
          height={100}
          className="rounded-lg shadow-md border-4 border-white mx-auto md:mx-0 object-contain"
        />
      </section>
      {/* Impact Stats Section */}
      <section className="w-full flex flex-col md:flex-row gap-2 md:gap-8 justify-center items-center">
        <div className="bg-card p-2 sm:p-4 rounded-lg shadow w-full md:w-1/2">
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-4 text-primary text-center md:text-left">Impact at a Glance</h3>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            <div className="flex flex-col items-center min-w-[110px] flex-1">
              <Users className="w-7 h-7 text-blue-500 mb-1" />
              <span className="text-xl font-bold text-foreground">400+</span>
              <span className="text-xs text-muted-foreground text-center">Students Served</span>
            </div>
            <div className="flex flex-col items-center min-w-[110px] flex-1">
              <GraduationCap className="w-7 h-7 text-green-500 mb-1" />
              <span className="text-xl font-bold text-foreground">8+</span>
              <span className="text-xs text-muted-foreground text-center">Classrooms</span>
            </div>
            <div className="flex flex-col items-center min-w-[110px] flex-1">
              <Star className="w-7 h-7 text-yellow-500 mb-1" />
              <span className="text-xl font-bold text-foreground">15+</span>
              <span className="text-xs text-muted-foreground text-center">Teachers Employed</span>
            </div>
            <div className="flex flex-col items-center min-w-[110px] flex-1">
              <Calendar className="w-7 h-7 text-purple-500 mb-1" />
              <span className="text-xl font-bold text-foreground">2022</span>
              <span className="text-xs text-muted-foreground text-center">Established</span>
            </div>
            <div className="flex flex-col items-center w-full mt-2">
              <span className="text-base font-semibold text-primary text-center">100% of donations go to construction and resources</span>
            </div>
          </div>
        </div>
      </section>
      {/* Main Card Section */}
      <section>
        <Card className="shadow-xl overflow-hidden w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            <div className="md:col-span-1 relative min-h-[80px] md:min-h-full bg-muted flex flex-col items-center md:items-start justify-center p-1 sm:p-4 w-full">
              <Image
                src="https://code-alpha-image-gallary.vercel.app/edm-school-logo.jpg"
                alt="EDM Marifa School Logo"
                width={70}
                height={70}
                className="object-contain rounded-md shadow-md"
                data-ai-hint="school logo badge"
              />
              <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground mt-2 text-center">EDM Marifa Secondary School</p>
            </div>
            <div className="md:col-span-2 w-full flex flex-col justify-between">
              <CardHeader className="w-full px-2 sm:px-4">
                <CardTitle className="text-xl sm:text-2xl text-primary flex items-center">
                  <Info className="h-7 w-7 mr-3" />
                  The EDM Marifa School & Building Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-4 w-full text-muted-foreground text-xs sm:text-base px-2 sm:px-4">
                <p>
                  As part of the evangelism mandate given by the Lord Jesus Christ to go out and share the Gospel of Salvation to the lost, Evangelism, Discipleship, & Missions (EDM) established the EDM Marifa Secondary School and is continuing the school building project at Koya Chiefdom, Port Loko District. This school addresses a keenly felt need not only for Marifa Village but also for all the surrounding villages.
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
              <CardFooter className="flex flex-col md:flex-row items-stretch md:items-center gap-2 sm:gap-4 pt-4 border-t w-full px-2 sm:px-4">
                <Button size="sm" className="text-xs sm:text-sm md:text-base font-semibold px-3 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary/90 w-full md:w-auto" asChild>
                  <Link href="/donate?reason=marifa_school_project">
                    Donate to School Project
                  </Link>
                </Button>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">For more information about the school project, please contact:</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">Edwin Kargbo</p>
                  <p className="text-xs sm:text-sm"><Phone className="inline mr-1 h-4 w-4" /> 503-505-8884</p>
                  <p className="text-xs sm:text-sm"><Mail className="inline mr-1 h-4 w-4" /> <a href="mailto:edwinjkargbo@yahoo.com" className="text-primary hover:underline">edwinjkargbo@yahoo.com</a></p>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </section>
      <section className="block md:hidden">
        <SectionTitle title="EDM Marifa School Media & Gallery" />
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          <button
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded font-semibold border text-xs sm:text-base transition-colors ${galleryTab === 'images' ? 'bg-primary text-white border-primary' : 'bg-card text-primary border-primary/30 hover:bg-primary/10'}`}
            onClick={() => setGalleryTab('images')}
          >
            Photos
          </button>
          <button
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded font-semibold border text-xs sm:text-base transition-colors ${galleryTab === 'videos' ? 'bg-primary text-white border-primary' : 'bg-card text-primary border-primary/30 hover:bg-primary/10'}`}
            onClick={() => setGalleryTab('videos')}
          >
            Videos
          </button>
        </div>
        {galleryTab === 'images' ? (
          <div>
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 whitespace-nowrap">
              {schoolImages.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-md flex-shrink-0 inline-block aspect-square bg-muted" style={{ width: 140, height: 140 }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="50vw"
                    style={{ objectFit: 'cover', position: 'absolute' }}
                    data-ai-hint={image.dataAiHint}
                    className="hover:scale-105 transition-transform duration-300 w-full h-full"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="aspect-video rounded-lg overflow-hidden shadow-md bg-muted">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dCLx4Cn2WwM"
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
                src="https://www.youtube.com/embed/T9TAnMRWkV8"
                title="EDM Marifa School Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </section>
      {/* Enhanced CTA Section */}
      <section className="text-center py-6 sm:py-8 flex justify-center w-full">
       <div className="max-w-2xl w-full px-2 sm:px-0">
         <Button size="sm" className="text-xs sm:text-sm md:text-base font-semibold px-3 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary/90 w-full" asChild>
           <Link href="/donate?reason=marifa_school_project">
             Donate Now
           </Link>
         </Button>
       </div>
     </section>
    </div>
  );
}
