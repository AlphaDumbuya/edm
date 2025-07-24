import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Button } from '@/components/ui/button';
import { Mail, Users, Globe, Megaphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AmbassadorPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Become an EDM Ambassador"
        subtitle="Amplify our mission in Sierra Leone and Oregon by sharing, connecting, and inspiring others."
        icon={Megaphone}
      />
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <SectionTitle title="What is an EDM Ambassador?" />
          <p className="text-base sm:text-lg text-muted-foreground">
            EDM Ambassadors are passionate advocates who use their voice, network, and influence to spread awareness of our mission, mobilize support, and connect new partners to our work in Sierra Leone and Oregon. As an ambassador, you play a vital role in expanding our impact and inspiring others to join the cause.
          </p>
          <ul className="list-disc pl-6 text-base text-muted-foreground mb-4">
            <li>Share EDM stories and opportunities in your community, church, or workplace.</li>
            <li>Host info sessions, events, or fundraisers to support our projects.</li>
            <li>Connect EDM with potential partners, volunteers, or donors.</li>
            <li>Be a bridge between EDM and your local/global network.</li>
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 relative">
          <Image
            src="https://media.istockphoto.com/id/1218194403/photo/mediation-intermediary-between-people-conflict-resolution-and-consensus-building-influential.webp?a=1&b=1&s=612x612&w=0&k=20&c=-42ApnPI3KiWd3XHZaw3ZU7mQT-660cWm8oeEFxt3Xg="
            alt="Ambassador mediation and consensus building"
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            data-ai-hint="ambassador mediation consensus building"
          />
        </div>
      </section>
      <SectionTitle title="Why Become an Ambassador?" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg shadow flex flex-col gap-3">
          <h3 className="font-semibold text-lg flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Expand Global Impact</h3>
          <p className="text-muted-foreground">Help EDM reach new audiences and communities, both locally and globally, by sharing our mission and connecting us with new supporters.</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow flex flex-col gap-3">
          <h3 className="font-semibold text-lg flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Build Community</h3>
          <p className="text-muted-foreground">Foster a network of passionate individuals and organizations who care about evangelism, discipleship, and missions in Sierra Leone and Oregon.</p>
        </div>
      </div>
      <SectionTitle title="How to Get Started" />
      <ol className="list-decimal pl-6 text-base text-muted-foreground mb-8">
        <li>Contact our team to express your interest and learn more about the ambassador program.</li>
        <li>Attend a virtual or in-person orientation session.</li>
        <li>Receive resources, stories, and support to help you share EDM's mission.</li>
        <li>Start making an impact in your circles!</li>
      </ol>
      <div className="text-center mt-8">
        <Link href="/contact">
          <Button size="lg" className="text-base">
            <Mail className="mr-2 h-5 w-5" /> Contact Us About Ambassadorship
          </Button>
        </Link>
      </div>
    </div>
  );
}
