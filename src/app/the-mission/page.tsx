// src/app/the-mission/page.tsx
'use client'; // Add this directive

import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Target, Building, Milestone, TrendingUp, CheckCircle, ShieldCheck, School, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Keep Link for other uses
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MissionsMapClient from '@/components/missions/missions-map-client';
import PrayerMapEmbed from '@/components/prayer/PrayerMapEmbed';

export default function TheMissionPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="The EDM Mission"
        subtitle="Our calling: Evangelism, Discipleship, and Missions in Sierra Leone and beyond, with key partnerships in Oregon, USA."
        icon={Target}
      />
      <section className="bg-primary/5 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <SectionTitle title="Our Guiding Principles" className="text-center"/>
        <div className="max-w-3xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-1 sm:mb-2">Purpose Statement</h3>
            <blockquote className="text-sm sm:text-base md:text-lg italic text-foreground mb-4 sm:mb-6 border-l-4 border-primary pl-3 sm:pl-4 py-1 sm:py-2">
              "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
            </blockquote>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-1 sm:mb-2">Motto</h3>
            <p className="text-sm sm:text-base md:text-lg italic text-foreground">
              "Love God and love others."
            </p>
        </div>
      </section>
      <section>
        <SectionTitle title="Our Vision for EDM" />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          <Card className="shadow-lg">
            <CardHeader className="p-4 sm:p-6">
               <div className="flex items-center gap-2 sm:gap-3">
                <Building className="h-6 w-6 sm:h-7 md:h-8 text-primary" />
                <CardTitle className="text-md sm:text-lg md:text-xl lg:text-2xl">A Campus for Christ in Sierra Leone</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4">
                Our long-term vision includes building a dedicated campus for the body of Christ in Sierra Leone. This central hub will feature a retreat center, educational facilities (including the operational EDM Marifa Secondary School and a future Bible school). This future Bible school is being established in partnership with Reformed Gospel Mission (ReGom) as the REGOM/EDM Bible Institute. <Link href="/ministries" className="text-primary hover:underline">Learn more about our ministries.</Link> lodging facilities, recreational areas, a chapel, and more. It is designed to serve as a center for spiritual growth, discipleship training, educational advancement, and a base for extensive outreach ministries throughout Sierra Leone.
              </p>
              <div className="relative w-full aspect-video rounded-md shadow-md overflow-hidden">
                <Image src="https://source.unsplash.com/random/600x350/?school,campus,africa,building,community" alt="Artist rendering of EDM Campus" layout="fill" objectFit="cover" data-ai-hint="campus building africa rendering" />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4 md:space-y-6">
            <Card className="shadow-md">
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Milestone className="h-5 w-5 sm:h-6 md:h-7 text-primary" />
                        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl">Short-Term Goals</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                <ul className="list-none text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-1.5">
                    <li className="flex items-start"><CheckCircle className="h-3 w-3 sm:h-4 text-green-500 mr-2 shrink-0 mt-0.5 sm:mt-1" /> Establish international board members to provide oversight and support.</li>
                    <li className="flex items-start"><CheckCircle className="h-3 w-3 sm:h-4 text-green-500 mr-2 shrink-0 mt-0.5 sm:mt-1" /> Show the "Jesus" movie for evangelism in various communities.</li>
                </ul>
                </CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <TrendingUp className="h-5 w-5 sm:h-6 md:h-7 text-primary" />
                        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl">Long-Term Goals</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                <ul className="list-none text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-1.5">
                    <li className="flex items-start"><TrendingUp className="h-3 w-3 sm:h-4 text-primary mr-2 shrink-0 mt-0.5 sm:mt-1" /> Build additional facilities on the EDM campus (Bible school, retreat center/meeting hall, lodging, etc.).</li>
                    <li className="flex items-start"><TrendingUp className="h-3 w-3 sm:h-4 text-primary mr-2 shrink-0 mt-0.5 sm:mt-1" /> Extend the mission outreach to other major cities and regions in Sierra Leone.</li>
                    <li className="flex items-start"><TrendingUp className="h-3 w-3 sm:h-4 text-primary mr-2 shrink-0 mt-0.5 sm:mt-1" /> Establish and develop key departments: Education, Training, Outreach/Missions, Development/Projects, Church Ministry, and Building & Maintenance.</li>
                </ul>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <SectionTitle title="Future Cities & Regional Impact" subtitle="Expanding EDM's reach beyond Freetown and Marifa" />
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 text-center">
          While our current hubs are Freetown and Marifa (with the EDM Marifa School), EDM's long-term vision includes extending our ministry to other cities across Sierra Leone and potentially neighboring West African countries.
        </p>
        <Card className="shadow-xl">
          <CardHeader className="p-3 sm:p-4 md:p-6">
            <CardTitle className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl">EDM Operational & Future Expansion</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Content for future cities/regional impact can go here */}
            {/* The map will show key locations including EDM Marifa School and areas of future focus */}
 <MissionsMapClient mapId={''} />
          </CardContent>
           <CardFooter className="p-2 sm:p-3 md:p-4 pt-2 sm:pt-3">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Note: Map functionality requires a Google Maps API key. Markers indicate current key locations including EDM Marifa School and areas of future focus.</p>
           </CardFooter>
        </Card>
      </section>
      <section>
       <SectionTitle title="Current Updates & Needs" />
        <Card className="shadow-lg bg-primary/5">
           <CardHeader className="p-4 sm:p-6">
               <CardTitle className="text-primary text-base sm:text-lg md:text-xl">Progress and Support Opportunities</CardTitle>
           </CardHeader>
           <CardContent className="space-y-1.5 sm:space-y-2 p-4 sm:p-6 text-xs sm:text-sm md:text-base text-muted-foreground">
               <p><strong className="text-foreground">EDM Marifa School Operational:</strong> We praise God that the EDM Marifa Secondary School is now operational!</p>
               <p><strong className="text-foreground">Land Acquired:</strong> We praise God that land has been acquired for the main EDM campus and retreat center!</p>
               <p><strong className="text-foreground">Van & Equipment:</strong> A van and musical instruments were shipped and have arrived in Freetown, enhancing our outreach capabilities. Your prayers and support for their effective deployment are appreciated.</p>
           </CardContent>
           <CardFooter className="p-4 sm:p-6">
               <Link href="/donate?reason=general_support" className={cn(buttonVariants({ variant: "default", size: "sm" }), "text-xs sm:text-sm")}>
                Support Our Ongoing Work
               </Link>
           </CardFooter>
        </Card>
      </section>
      <section className="bg-card p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Join Us on This Journey" className="text-center" />
        <div className="flex flex-col items-center">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-4 sm:mb-6">
            We invite you to partner with Evangelism, Discipleship, Missions (EDM). Whether through prayer, financial support for our work in Sierra Leone (including the EDM Marifa School) and Oregon, or volunteering your time and talents, you can be a part of this life-changing work. Together, we can make a lasting difference.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 flex items-center">
            <ShieldCheck className="h-3 w-3 sm:h-4 mr-1 text-primary" /> EDM is a registered 501(c)(3) non-profit organization.
          </p>
          <div className="text-center mt-4 sm:mt-6 md:mt-8">
            <Link href="/donate" className={cn(buttonVariants({ variant: "default", size: "lg" }), "px-3 py-1.5 text-xs sm:text-sm sm:px-4 sm:py-2 md:px-6 md:text-base")}>
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>
      <section>
        <SectionTitle title="Key Locations (Map)" />
        <div className="grid md:grid-cols-2 gap-6">
          <PrayerMapEmbed location="Freetown, Sierra Leone" label="EDM HQ: Freetown" />
          <PrayerMapEmbed location="Marifa, Sierra Leone" label="EDM Marifa School" />
        </div>
      </section>
    </div>
  );
}


