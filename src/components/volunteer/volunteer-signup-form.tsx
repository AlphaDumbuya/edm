
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'; // Standard Label, not FormLabel for direct form.register
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User, Briefcase, CalendarDays, PhoneIcon, MailIcon } from 'lucide-react'; 
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import {
  Form, 
  FormControl,
  FormField,
  FormItem,
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const volunteerAreasOfInterest = [
    { id: 'evangelism', label: 'Evangelism & Outreach (Sierra Leone)' },
    { id: 'discipleship', label: 'Discipleship & Mentoring (Sierra Leone)' },
    { id: 'education', label: 'Educational Support (EDM Marifa School)' },
    { id: 'construction', label: 'Practical Help / Construction (Sierra Leone Campus)' },
    { id: 'admin_fundraising_us', label: 'Admin/Fundraising Support (Oregon, USA)' },
    { id: 'skills_remote', label: 'Skills-Based Volunteering (Remote - IT, Design, Writing, etc.)' },
    { id: 'event_hosting', label: 'Host a "Jesus" Film Screening / Awareness Event' },
    { id: 'prayer_team', label: 'Join Prayer Support Team' },
];

const volunteerFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  areasOfInterest: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one area of interest.',
  }),
  availability: z.string().min(5, { message: 'Please describe your availability.'}),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

export default function VolunteerSignupForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      areasOfInterest: [],
      availability: '',
      message: '',
    },
  });

  const onSubmit = async (data: VolunteerFormValues) => {
    setIsSubmitting(true);
    console.log('Volunteer signup data:', data);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Volunteer Interest Submitted!',
      description: 'Thank you for your interest in volunteering with EDM. We will be in touch soon.',
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <Card className="w-full shadow-xl border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center text-primary text-xl md:text-2xl">
            <User className="mr-2 h-6 w-6" /> Volunteer Sign-up Form
          </CardTitle>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            {/* Name Field - Standard input, manual error display */}
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...form.register('name')} placeholder="John Doe" disabled={isSubmitting} />
              {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
            </div>

            {/* Email Field - Standard input, manual error display */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...form.register('email')} placeholder="you@example.com" disabled={isSubmitting} />
              {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
            </div>

            {/* Phone Field - Standard input, manual error display (optional) */}
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" {...form.register('phone')} placeholder="(123) 456-7890" disabled={isSubmitting} />
              {form.formState.errors.phone && <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>}
            </div>
            
            {/* Areas of Interest - Using FormField for checkbox group */}
            <FormField
              control={form.control}
              name="areasOfInterest"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="flex items-center text-base"><Briefcase className="mr-2 h-4 w-4"/> Areas of Interest (Select all that apply)</FormLabel>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 p-2 rounded-md border max-h-48 overflow-y-auto">
                    {volunteerAreasOfInterest.map((area) => (
                      <FormField
                        key={area.id}
                        control={form.control}
                        name="areasOfInterest"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(area.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), area.id])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== area.id
                                          )
                                        );
                                  }}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal text-muted-foreground">
                                {area.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Availability Field - Standard input, manual error display */}
            <div className="space-y-1.5">
              <Label htmlFor="availability" className="flex items-center"><CalendarDays className="mr-2 h-4 w-4"/> Your Availability</Label>
              <Textarea id="availability" {...form.register('availability')} placeholder="e.g., Evenings, weekends, specific months, long-term, short-term mission trip..." rows={3} disabled={isSubmitting} />
              {form.formState.errors.availability && <p className="text-sm text-destructive mt-1">{form.formState.errors.availability.message}</p>}
            </div>

            {/* Message Field - Standard input, manual error display (optional) */}
            <div className="space-y-1.5">
              <Label htmlFor="message" className="flex items-center"><MailIcon className="mr-2 h-4 w-4"/> Additional Skills or Message (Optional)</Label>
              <Textarea id="message" {...form.register('message')} placeholder="Tell us more about your skills, or any specific questions you have..." rows={3} disabled={isSubmitting} />
              {form.formState.errors.message && <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                  <><Briefcase className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
              ) : (
                  <><Send className="mr-2 h-4 w-4" /> Submit Volunteer Application</>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
