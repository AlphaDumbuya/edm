import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Film, Users, Globe, Star } from 'lucide-react';
import Link from 'next/link';

export default function MovieScreeningPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center py-8">
        <div className="flex flex-col items-center gap-2">
          <Film className="h-12 w-12 text-primary mb-2" />
          <h1 className="text-4xl font-bold">Movie Screening Outreach</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Share the Gospel in a powerful, visual way by hosting a movie screening event with EDM. Bring hope and transformation to communities in Sierra Leone and beyond.
          </p>
        </div>
      </header>
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1703764884882-2edc8c4961bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGplc3VzJTIwbW92aWUlMjBzaG93JTIwaW4lMjBhZnJpY2F8ZW58MHx8MHx8fDA%3D"
          alt="People watching a movie screening in Africa"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <section className="container mx-auto px-4 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Why Host a Movie Screening?</h2>
          <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-2">
            <li>Break literacy and language barriers with a visual Gospel presentation.</li>
            <li>Reach entire villages and communities in a single event.</li>
            <li>Foster discussion, prayer, and follow-up opportunities.</li>
            <li>Empower local churches and leaders to continue the work.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">How to Host a Screening</h2>
          <ol className="list-decimal pl-6 text-lg text-muted-foreground space-y-2">
            <li>Contact EDM to express your interest and receive resources.</li>
            <li>Choose a location (church, school, open field, etc.) and set a date.</li>
            <li>Promote the event in your community or network.</li>
            <li>EDM provides the "Jesus" film and technical support if needed.</li>
            <li>Host the screening, facilitate discussion, and gather feedback.</li>
            <li>Connect attendees with local churches or follow-up teams.</li>
          </ol>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-card p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">10,000+</span>
            <span className="text-muted-foreground">People reached through EDM screenings</span>
          </div>
          <div className="bg-card p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">50+</span>
            <span className="text-muted-foreground">Communities impacted in Sierra Leone</span>
          </div>
          <div className="bg-card p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <Star className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Countless</span>
            <span className="text-muted-foreground">Lives transformed by the Gospel</span>
          </div>
        </div>
        <div className="bg-muted p-6 rounded-lg shadow mt-8">
          <h3 className="font-semibold text-lg mb-2">Testimonial</h3>
          <blockquote className="italic text-muted-foreground">“The movie screening brought our whole village together. Many heard the Gospel for the first time, and several families started attending church. Thank you, EDM!”<br /><span className="block mt-2 font-semibold">— Local Pastor, Sierra Leone</span></blockquote>
        </div>
        <div className="text-center mt-8">
          <Link href="/contact" legacyBehavior>
            <Button size="lg" className="text-base">
              <Mail className="mr-2 h-5 w-5" /> Contact Us to Host a Screening
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}