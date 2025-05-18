
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Target, Users, Globe, HeartHandshake, BookOpenText, Building, Milestone, Eye, TrendingUp, CheckCircle, Map, ShieldCheck, School } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MissionsMapClient from '@/components/missions/missions-map-client';


export default function TheMissionPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="The EDM Mission"
        subtitle="Our calling: Evangelism, Discipleship, and Missions in Sierra Leone and beyond, with key partnerships in Oregon, USA."
        icon={Target}
      />

      <section className="text-center bg-primary/5 p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Our Guiding Principles" className="text-center"/>
        <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary mb-2">Purpose Statement</h3>
            <blockquote className="text-xl italic text-foreground mb-6 border-l-4 border-primary pl-4 py-2">
              "In our acts of obedience and worship to God, we will go out and share the good news to the unbelievers, train them to maturity so they will train others."
            </blockquote>
            <h3 className="text-2xl font-semibold text-primary mb-2">Motto</h3>
            <p className="text-xl italic text-foreground">
              "Love God and love others."
            </p>
        </div>
      </section>
      
      <section>
        <SectionTitle title="Our Vision for EDM" />
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg">
            <CardHeader>
               <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">A Campus for Christ in Sierra Leone</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our long-term vision includes building a dedicated campus for the body of Christ in Sierra Leone. This central hub will feature a retreat center, educational facilities (including the operational EDM Marifa Secondary School and a future Bible school), lodging facilities, recreational areas, a chapel, and more. It is designed to serve as a center for spiritual growth, discipleship training, educational advancement, and a base for extensive outreach ministries throughout Sierra Leone.
              </p>
              <Image src="https://placehold.co/600x400.png" alt="Artist rendering of EDM Campus" width={600} height={400} data-ai-hint="campus building africa rendering" className="rounded-md shadow-md"/>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Milestone className="h-7 w-7 text-primary" />
                        <CardTitle className="text-xl">Short-Term Goals</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                <ul className="list-none text-muted-foreground text-sm space-y-2">
                    <li className="flex items-start"><School className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Support and develop the operational EDM Marifa Secondary School.</li>
                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Get the van and equipment through customs in Freetown.</li>
                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Finalize land acquisition for the main EDM campus.</li>
                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Establish international board members to provide oversight and support.</li>
                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Conduct comprehensive evangelism training for local leaders and volunteers.</li>
                    <li className="flex items-start"><CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-1" /> Show the "Jesus" movie for evangelism in various communities.</li>
                </ul>
                </CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-7 w-7 text-primary" />
                        <CardTitle className="text-xl">Long-Term Goals</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                <ul className="list-none text-muted-foreground text-sm space-y-2">
                    <li className="flex items-start"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0 mt-1" /> Build additional facilities on the EDM campus (Bible school, retreat center/meeting hall, lodging, etc.).</li>
                    <li className="flex items-start"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0 mt-1" /> Extend the mission outreach to other major cities and regions in Sierra Leone.</li>
                    <li className="flex items-start"><TrendingUp className="h-4 w-4 text-primary mr-2 shrink-0 mt-1" /> Establish and develop key departments: Education, Training, Outreach/Missions, Development/Projects, Church Ministry, and Building & Maintenance.</li>
                </ul>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section>
        <SectionTitle title="Future Cities & Regional Impact" subtitle="Expanding EDM's reach beyond Freetown and Marifa" />
        <p className="text-muted-foreground mb-6 text-center">
          While our current hubs are Freetown and Marifa (with the EDM Marifa School), EDM's long-term vision includes extending our ministry to other cities across Sierra Leone and potentially neighboring West African countries. The map below highlights our current primary operational areas and future expansion considerations.
        </p>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center"><Map className="mr-2 h-6 w-6 text-primary"/>EDM Operational & Future Expansion Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[16/9] md:aspect-[2/1] bg-muted rounded-lg overflow-hidden">
              <MissionsMapClient mapId="edm_the_mission_map" />
            </div>
          </CardContent>
           <CardFooter className="pt-4">
            <p className="text-xs text-muted-foreground">Note: Map functionality requires a Google Maps API key. Markers indicate current key locations including EDM Marifa School and areas of future focus.</p>
           </CardFooter>
        </Card>
      </section>

       <section>
        <SectionTitle title="Current Updates & Needs" />
         <Card className="shadow-lg bg-primary/5">
            <CardHeader>
                <CardTitle className="text-primary">Progress and Urgent Needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">EDM Marifa School Operational:</strong> We praise God that the EDM Marifa Secondary School is now operational, serving the community and sharing the Gospel!</p>
                <p><strong className="text-foreground">Land Acquired:</strong> We have acquired land for the main EDM campus and retreat center for the Body of Christ in Sierra Leone!</p>
                <p><strong className="text-foreground">Van & Equipment:</strong> A van and musical instruments were shipped in August and are expected to arrive the first week of October. These are vital for our outreach.</p>
                <p className="font-semibold text-destructive"><strong className="text-foreground">Urgent Need:</strong> There is an outstanding balance of $3,500.00 to pay customs in Freetown for the van and equipment. Your support is crucial to clear these items.</p>
                 <p><strong className="text-foreground">Support EDM Marifa School:</strong> We are actively seeking financial support and prayers for the ongoing operations and development of the EDM Marifa School.</p>
            </CardContent>
            <CardFooter>
                <Link href="/donate">
                    <Button variant="default">Help Meet These Needs</Button>
                </Link>
            </CardFooter>
         </Card>
       </section>

      <section className="bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Join Us on This Journey" className="text-center" />
        <div className="flex flex-col items-center">
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            We invite you to partner with Evangelism, Discipleship, Missions (EDM). Whether through prayer, financial support for our work in Sierra Leone (including the EDM Marifa School) and Oregon, or volunteering your time and talents, you can be a part of this life-changing work. Together, we can make a lasting difference.
          </p>
          <p className="text-sm text-muted-foreground mt-2 flex items-center">
            <ShieldCheck className="h-4 w-4 mr-1 text-primary" /> EDM is a registered 501(c)(3) non-profit organization.
          </p>
          <div className="text-center mt-8">
            <Link href="/donate">
              <Button size="lg" variant="default">Support Our Mission</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
