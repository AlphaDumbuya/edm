import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, Handshake, Mail, ArrowLeft, BookOpen, DollarSign, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ChurchPartnershipPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Church Partnerships with EDM"
        subtitle="Unite with EDM to amplify your church's mission impact in Sierra Leone and Oregon."
        icon={Building}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-3 md:space-y-4">
          <SectionTitle title="Partner Your Congregation" />
          <p className="text-base sm:text-lg text-muted-foreground">
            Partner your congregation with EDM to expand missions in Sierra Leone and engage with our Oregon network. Mobilize members for impactful outreach, sharing the Gospel, supporting discipleship, and contributing to vital community projects.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Together, we can empower local leaders, plant and strengthen churches in Sierra Leone, and provide essential resources for sustainable ministry.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 relative">
          <Image
            src="https://images.unsplash.com/photo-1560253226-26f367c49ae2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhJTIwY2h1cmNofGVufDB8fDB8fHww"
            alt="African church congregation in fellowship"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="african church congregation"
          />
        </div>
      </section>
      <SectionTitle title="How Your Church Can Partner" subtitle="Collaborate for greater Kingdom impact" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Mission Trips & Teams</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Organize short-term mission trips to Sierra Leone for evangelism, construction, medical outreach, or leadership training.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Project Sponsorship</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Support specific EDM projects like the EDM Marifa School, campus development in Sierra Leone, or evangelistic crusades.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Resource Mobilization</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Help gather and send needed resources such as Bibles, discipleship materials, educational supplies, or ministry equipment to Sierra Leone.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Users className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Support Missionaries</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Partner in supporting local missionaries and church planters in Sierra Leone, enabling them to dedicate their lives to ministry.
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
              <Handshake className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-lg sm:text-xl">Joint Outreach Events</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Collaborate on local outreach events within your community in Oregon to raise awareness and support for the mission in Sierra Leone.
            </p>
          </CardContent>
        </Card>
      </div>
      <section className="text-center bg-card p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Connect Your Church" className="text-center" />
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8">
          We believe in the power of the local church. Let's explore how your congregation can join hands with EDM to make a lasting impact in Sierra Leone and Oregon.
        </p>
        <Link
          href="/contact"
          legacyBehavior>
          <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base">
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Discuss Church Partnership
          </Button>
        </Link>
      </section>
      <div className="text-center mt-8 md:mt-12">
        <Link href="/get-involved/partner" legacyBehavior>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm"><ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Back to Partnership Overview</Button>
        </Link>
      </div>
    </div>
  );
}
