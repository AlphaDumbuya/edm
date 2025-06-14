// src/app/ministries/education/rosortta-school/page.tsx

import React from 'react';
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Building } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export default function RosorttaSchoolPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="EDM Rosortta School"
        subtitle="A new mission project under construction in Sanda Tenraren chiefdom, Karene District (North West Province), Sierra Leone."
        icon={Building}
      />

      <section>
        <Card className="shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Left Column - Image */}
            <div className="md:col-span-1 relative min-h-[250px] md:min-h-full bg-muted flex flex-col items-center justify-center p-4">
              <Image // Placeholder Image
                src="https://code-alpha-image-gallary.vercel.app/rosetta1.jpg"
                alt="EDM Rosortta School Construction Site"
                width={300}
                height={200}
                className="object-cover rounded-md shadow-md"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                EDM Rosortta School Project
              </p>
            </div>

            {/* Right Column - Content */}
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  The EDM Rosortta School Project - Under Construction
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <SectionTitle title="A Beacon of Hope" />
                <p className="text-lg text-muted-foreground">
                  We are excited to announce the ongoing construction of the EDM Rosortta School in Sanda Tenraren chiefdom, Karene District (North West Province), Sierra Leone.
                  This project is a vital part of our mission to
                  bring educational opportunities to children who currently lack access to schooling
                  beyond the primary level.
                </p>

                <SectionTitle title="Why This School Matters" />
                <p className="text-lg text-muted-foreground">
                  Located in Sanda Tenraren chiefdom, Karene District, this school will address a powerful need in the community, creating a dedicated
                  space for learning, growth, and hope for the future generations in Rosortta
                  and the surrounding areas. It's more than just a building; it's an
                  investment in the potential of these children.
                </p>

                <SectionTitle title="How You Can Help" />
                <p className="text-lg text-muted-foreground">
                  Every contribution, no matter the size, will go directly to the construction of
                  the school. By donating, you won’t just be giving — you’ll be planting a seed of
                  opportunity that will bear fruit for generations to come.
                </p>

                
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t">
                <Link href="https://donate.stripe.com/dRm5kEe6L0p8eLHc5aeAg00" passHref>
                  <Button>
                    <Building className="mr-2 h-5 w-5" />
                    Support School Construction Project
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Placeholder Image 1 */}
 <div className="aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
 src="https://code-alpha-image-gallary.vercel.app/rosetta2.jpeg"
 alt="Rosortta School Construction Progress - Image 1"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 2 */}
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
 src="https://code-alpha-image-gallary.vercel.app/rosetta3.jpeg"
 alt="Rosortta School Construction Progress - Image 2"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 3 */}
          <div className="aspect-video relative rounded-lg overflow-hidden shadow-md">
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

      {/* Optional: Add a donation button at the bottom */}
       <section className="text-center py-8">
        <Link href="https://donate.stripe.com/dRm5kEe6L0p8eLHc5aeAg00" passHref>
          <Button size="lg">Support School Construction Project</Button>
        </Link>
      </section>
    </div>
  );
}
