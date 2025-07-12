// src/app/ministries/education/rosortta-school/page.tsx

import React from 'react';
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Building, GraduationCap, Users, Calendar, Star } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export default function RosorttaSchoolPage() {
  return (
    <div className="space-y-12 w-full max-w-none px-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg p-3 sm:p-6 flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-8 w-full gap-6">
        <div className="flex-1 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-2 break-words leading-tight">
            Rosortta School: Building Brighter Futures
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mb-4">
            Empowering children in Sanda Tenraren chiefdom, Karene District, Sierra Leone, with access to quality education and hope for a better tomorrow.
          </p>
        </div>
        <Image
          src="https://code-alpha-image-gallary.vercel.app/rosetta1.jpg"
          alt="Rosortta School Hero"
          width={320}
          height={200}
          className="rounded-lg shadow-md border-4 border-white mx-auto md:mx-0"
        />
      </section>

      {/* Existing PageHeader and main card... */}
      <PageHeader
        title="EDM Rosortta School"
        subtitle="A new mission project under construction in Sanda Tenraren chiefdom, Karene District (North West Province), Sierra Leone."
        icon={Building}
      />
      <section>
        <Card className="shadow-xl overflow-hidden w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            {/* Left Column - Image and Impact Stats */}
            <div className="md:col-span-1 relative min-h-[180px] md:min-h-full bg-muted flex flex-col items-center md:items-start justify-center p-2 sm:p-4 w-full">
              <Image
                src="https://code-alpha-image-gallary.vercel.app/rosetta1.jpg"
                alt="EDM Rosortta School Construction Site"
                width={220}
                height={140}
                className="object-cover rounded-md shadow-md"
              />
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center">
                EDM Rosortta School Project
              </p>
              <div className="bg-card p-2 sm:p-4 rounded-lg shadow mt-4 w-full">
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-primary">Impact at a Glance</h3>
                <ul className="text-muted-foreground text-sm sm:text-base space-y-1">
                  <li className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-500" /><strong>500+</strong> children will gain access to quality secondary education</li>
                  <li className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-green-500" /><strong>95%</strong> expected graduation rate</li>
                  <li className="flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500" /><strong>2024</strong> opening year</li>
                  <li className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" /><strong>20+</strong> teachers employed from the local community</li>
                  <li><strong>10+</strong> classrooms, science labs, library, and community space</li>
                  <li><strong>100%</strong> of donations go to construction and resources</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="md:col-span-2 w-full flex flex-col justify-between">
              <CardHeader className="w-full">
                <CardTitle className="text-xl sm:text-2xl text-primary flex items-center">
                  The EDM Rosortta School Project - Under Construction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 w-full">
                <SectionTitle title="A Beacon of Hope" />
                <p className="text-base sm:text-lg text-muted-foreground">
                  We are excited to announce the ongoing construction of the EDM Rosortta School in Sanda Tenraren chiefdom, Karene District (North West Province), Sierra Leone.
                  This project is a vital part of our mission to
                  bring educational opportunities to children who currently lack access to schooling
                  beyond the primary level.
                </p>

                <SectionTitle title="Why This School Matters" />
                <p className="text-base sm:text-lg text-muted-foreground">
                  Located in Sanda Tenraren chiefdom, Karene District, this school will address a powerful need in the community, creating a dedicated
                  space for learning, growth, and hope for the future generations in Rosortta
                  and the surrounding areas. It's more than just a building; it's an
                  investment in the potential of these children.
                </p>

                <SectionTitle title="Recent Achievements & Updates" />
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Foundation and walls completed as of June 2024</li>
                  <li>Roofing and classroom interiors underway</li>
                  <li>First cohort of students expected September 2024</li>
                  <li>Community partnership with local leaders established</li>
                </ul>

                <SectionTitle title="How You Can Help" />
                <p className="text-base sm:text-lg text-muted-foreground">
                  Every contribution, no matter the size, will go directly to the construction of
                  the school. By donating, you won’t just be giving — you’ll be planting a seed of
                  opportunity that will bear fruit for generations to come.
                </p>

                <div className="bg-muted p-2 sm:p-4 rounded-lg shadow mt-6 w-full">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Testimonial</h3>
                  <blockquote className="italic text-muted-foreground text-sm sm:text-base">“The new school will change the future for our children. We are grateful for EDM’s vision and the support of partners around the world.”<br /><span className="block mt-2 font-semibold">— Community Leader, Rosortta</span></blockquote>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col md:flex-row items-stretch md:items-center gap-4 pt-4 border-t w-full">
                <Link href="https://donate.stripe.com/dRm5kEe6L0p8eLHc5aeAg00" passHref legacyBehavior>
                  <Button
                    size="sm"
                    className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary/90 w-full md:w-auto"
                  >
                    Donate to School Project
                  </Button>
                </Link>
                <Link href="/contact" legacyBehavior>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 w-full md:w-auto">
                    Contact About Partnership
                  </Button>
                </Link>
              </CardFooter>
            </div>
          </div>
        </Card>
      </section>

      {/* Gallery Section */}
      <section>
        <SectionTitle title="Rosortta School Construction Gallery" subtitle="See the progress of the new school building." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 w-full">
          {/* Placeholder Image 1 */}
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-md min-h-[120px] w-full">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/rosetta2.jpeg"
              alt="Rosortta School Construction Progress - Image 1"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 2 */}
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-md min-h-[120px] w-full">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/rosetta3.jpeg"
              alt="Rosortta School Construction Progress - Image 2"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 3 */}
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-md min-h-[120px] w-full">
            <Image
              src="https://code-alpha-image-gallary.vercel.app/rosetta4.jpeg"
              alt="Rosortta School Construction Progress - Image 3"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="text-center py-8 sm:py-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-lg mt-8 w-full flex justify-center">
        <div className="max-w-2xl w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">Join Us in Building a Brighter Future</h2>
          <p className="mb-6 text-base sm:text-lg text-muted-foreground">
            Your support will help us complete the Rosortta School and provide life-changing opportunities for children in Sierra Leone. Every donation makes a difference.
          </p>
          <Button size="sm" className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary/90 w-full md:w-auto mx-auto">
            Donate Now
          </Button>
        </div>
      </section>
    </div>
  );
}
