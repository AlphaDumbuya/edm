import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Users, Share2, HandHeart, Mail, Megaphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AmbassadorPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="EDM Ambassador Program"
        subtitle="Be a voice for change and impact in Sierra Leone & Oregon"
        icon={Megaphone}
      />

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Join Our Ambassador Network</h2>
          <p className="text-lg text-muted-foreground">
            As an EDM Ambassador, you'll play a crucial role in spreading awareness about our mission in Sierra Leone and Oregon. 
            Your voice can inspire others to get involved in making a lasting impact through evangelism, discipleship, and missions.
          </p>
          <div className="flex gap-4">
            <Link href="/contact">
              <Button size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact for More Info
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 relative">
          <Image
            src="https://media.istockphoto.com/id/1365344471/photo/business-leadership-or-career-growth-network-marketing-or-partnership-organization-concept.webp?b=1&s=170667a&w=0&k=20&c=ZKz6TxVxbLepgPp5q_ojxh8O-CSW5dQpQuT5GD0JG0o="
            alt="EDM Ambassador Network"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="professional networking"
          />
        </div>
      </section>

      <section>
        <SectionTitle 
          title="Ambassador Responsibilities" 
          subtitle="Make an impact in your community and beyond"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Share Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Share EDM's mission and impact stories within your network, church, and community through social media and personal connections.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Connect People</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Help connect potential partners, volunteers, and supporters with EDM's work in Sierra Leone and Oregon.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <HandHeart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Represent EDM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Represent EDM at local events, church gatherings, and community functions to raise awareness about our mission.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/50 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">Ambassador Benefits</h2>
          <ul className="text-muted-foreground space-y-4 text-left max-w-xl mx-auto">
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-1 rounded-full">
                <Volume2 className="h-4 w-4 text-primary" />
              </div>
              <span>Regular updates and inside news about EDM's work and impact</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-1 rounded-full">
                <Volume2 className="h-4 w-4 text-primary" />
              </div>
              <span>Access to exclusive ambassador training and resources</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-1 rounded-full">
                <Volume2 className="h-4 w-4 text-primary" />
              </div>
              <span>Opportunities to participate in special EDM events and programs</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <SectionTitle title="Ready to Become an Ambassador?" className="text-center" />
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join our network of passionate individuals making a difference through EDM's mission. 
          We'll provide you with the training and resources you need to be an effective ambassador.
        </p>
        <Link href="/contact">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" /> Contact for More Info
          </Button>
        </Link>
      </section>
    </div>
  );
}
