// src/app/contact/page.tsx
'use client'; // Add this directive

import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, MapPin, Send, Building, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MissionsMapClientProps } from '@/components/missions/missions-map-client';
import PrayerMapEmbed from '@/components/prayer/PrayerMapEmbed';

const MissionsMapClient = dynamic<MissionsMapClientProps>(() => import('@/components/missions/missions-map-client'), {
  ssr: false,
  loading: () => <div style={{ height: '400px', width: '100%', background: 'hsl(var(--muted))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>,
});

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate form submission
    console.log('Contact form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting EDM. We will get back to you soon.',
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHeader
        title="Contact EDM"
        subtitle="We'd love to hear from you. Reach out with questions, partnership inquiries, or to learn more about our work in Sierra Leone and Oregon."
        icon={Mail}
      />

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <SectionTitle title="Get in Touch" />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <Card className="shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...form.register('name')} placeholder="John Doe" disabled={isSubmitting} />
                  {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...form.register('email')} placeholder="you@example.com" disabled={isSubmitting} />
                  {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...form.register('subject')} placeholder="Inquiry about partnership" disabled={isSubmitting} />
                  {form.formState.errors.subject && <p className="text-sm text-destructive mt-1">{form.formState.errors.subject.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" {...form.register('message')} placeholder="Tell us how we can help..." rows={5} disabled={isSubmitting} />
                  {form.formState.errors.message && <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>}
                </div>
              </CardContent>
              <CardContent className="border-t pt-4 sm:pt-6">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="space-y-6 md:space-y-8">
          <SectionTitle title="Our Locations" />
          <Card className="shadow-md">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center text-primary text-lg sm:text-xl"><Building className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Sierra Leone Headquarters</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start"><MapPin className="mr-2 h-4 w-4 text-primary shrink-0" /> 66 Main Grafton Road, Kossoh Town, Freetown, Sierra Leone</p>
              <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary shrink-0" /> +23276781153</p>
 <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary shrink-0" /> +23276293906</p>
              <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary shrink-0" /> <a href="mailto:edmsierraleone@gmail.com" className="hover:underline">edmsierraleone@gmail.com</a></p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center text-primary text-lg sm:text-xl"><Users className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Oregon, USA Partnership Office</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-1.5 sm:space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start"><MapPin className="mr-2 h-4 w-4 text-primary shrink-0" /> 12301 South East Stephens Street, Portland, Oregon 97233, USA</p>
              <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary shrink-0" />+ 1 503-505-8884</p>
              <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-primary shrink-0" /> <a href="mailto:edwinjkargbo@yahoo.com" className="hover:underline">edwinjkargbo@yahoo.com</a></p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <SectionTitle title="Find Us on the Map" />
         <Card className="shadow-xl">
          <CardContent className="p-0">
            <div className="aspect-[16/9] md:aspect-[2/1] bg-muted rounded-lg overflow-hidden">
              <MissionsMapClient mapId="edm_contact_map" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionTitle title="Find Us on the Map (Simple)" />
        <div className="grid md:grid-cols-2 gap-6">
          <PrayerMapEmbed location="66 Main Grafton Road, Kossoh Town, Freetown, Sierra Leone" label="Sierra Leone HQ" />
          <PrayerMapEmbed location="12301 South East Stephens Street, Portland, Oregon 97233, USA" label="Oregon, USA Office" />
        </div>
      </section>
    </div>
  );
}
