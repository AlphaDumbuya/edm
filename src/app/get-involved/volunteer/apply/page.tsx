'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function VolunteerApplicationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    area: "",
    experience: "",
    availability: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Submit the form data to your API or backend
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          areasOfInterest: [formData.area], // Convert to array to match the database schema
          availability: formData.availability,
          message: formData.message + "\n\nExperience:\n" + formData.experience + "\n\nLocation: " + formData.location,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-[1400px] py-6 md:py-10 px-4 md:px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8">
            {/* Header Section */}
            <div className="mb-12">
              <div>
                <div className="inline-block p-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Join Our Mission
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Volunteer Application</h1>
                <p className="text-muted-foreground text-base md:text-lg">
                  Thank you for your interest in volunteering with EDM. Your skills and dedication can make a real
                  difference in our mission work in Sierra Leone.
                </p>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Active Volunteers</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Program Areas</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">2</div>
                <div className="text-sm text-muted-foreground">Locations</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Impact</div>
              </div>
            </div>
            {/* Application Form */}
            <div className="bg-card rounded-xl border shadow-sm p-4 md:p-8 relative">
              {/* Progress Indicator */}
              <div className="absolute top-0 left-0 w-full h-1 bg-muted overflow-hidden rounded-t-xl">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: '33%' }}></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Start Your Volunteer Journey
                  </h2>
                  <p className="text-muted-foreground">
                    Please fill out the form below. We'll review your application and contact you within 2-3 business days.
                  </p>
                </div>
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">1</span>
                      Personal Information
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Please provide your contact details.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="font-medium flex items-center gap-1">
                        Full Name 
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="bg-background"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="font-medium flex items-center gap-1">
                        Email Address 
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="bg-background"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="bg-background"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location" className="font-medium flex items-center gap-1">
                        Current Location 
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="City, Country"
                        className="bg-background"
                      />
                    </div>
                  </div>
                </div>
                {/* Volunteer Preferences Section */}
                <div className="space-y-6">
                  <div className="border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">2</span>
                      Volunteer Preferences
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Tell us how you'd like to contribute.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="area" className="font-medium flex items-center gap-1">
                        Area of Interest 
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        name="area" 
                        onValueChange={(value) => handleChange({ target: { name: "area", value } } as any)}
                        required
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Choose an area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="evangelism">Evangelism & Outreach (Sierra Leone)</SelectItem>
                          <SelectItem value="discipleship">Discipleship & Mentoring (Sierra Leone)</SelectItem>
                          <SelectItem value="education">Educational Support (EDM Marifa School)</SelectItem>
                          <SelectItem value="construction">Practical Help / Construction (Sierra Leone Campus)</SelectItem>
                          <SelectItem value="admin">Admin/Fundraising Support (Oregon, USA)</SelectItem>
                          <SelectItem value="skills-based">Skills-Based Volunteering (Remote - IT, Design, Writing, etc.)</SelectItem>
                          <SelectItem value="jesus-film">Host a "Jesus" Film Screening / Awareness Event</SelectItem>
                          <SelectItem value="prayer">Join Prayer Support Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="availability" className="font-medium flex items-center gap-1">
                        Availability 
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        name="availability" 
                        onValueChange={(value) => handleChange({ target: { name: "availability", value } } as any)}
                        required
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short-term">Short-term (1-3 months)</SelectItem>
                          <SelectItem value="medium-term">Medium-term (3-6 months)</SelectItem>
                          <SelectItem value="long-term">Long-term (6+ months)</SelectItem>
                          <SelectItem value="remote">Remote Only</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/* Experience Section */}
                <div className="space-y-6">
                  <div className="border-b pb-2">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">3</span>
                      Experience & Additional Information
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Tell us about your background and motivation.</p>
                  </div>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="experience" className="font-medium flex items-center gap-1">
                        Relevant Experience 
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Please describe your relevant skills, qualifications, and any previous volunteer experience."
                        className="min-h-[150px] bg-background"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message" className="font-medium">Additional Information</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share your motivation for volunteering with EDM, any specific projects you're interested in, or any questions you have."
                        className="min-h-[150px] bg-background"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6 space-y-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
                    <p className="font-medium">Before submitting:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1.5">
                      <li>Ensure all required fields (*) are completed</li>
                      <li>Review your responses for accuracy</li>
                      <li>Make sure your contact information is correct</li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-center space-y-6">
                    <Button 
                      type="submit"
                      className="w-full sm:w-auto min-w-[200px] h-12 text-base font-medium"
                    >
                      Submit Application
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Need help? Contact us at{' '}
                      <a href="mailto:contact@edmmission.org" className="text-primary hover:underline">
                        contact@edmmission.org
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Right Column - Supplementary Information */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Why Volunteer with EDM?</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Make a lasting impact in Sierra Leone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Share your skills where needed most</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Gain cross-cultural experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Be part of meaningful change</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-medium">Process Timeline</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2 pl-2">
                      <li>Application review (2-3 days)</li>
                      <li>Initial contact</li>
                      <li>Online interview if needed</li>
                      <li>Placement matching</li>
                      <li>Onboarding</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">Application Submitted Successfully!</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 text-center pt-4">
                <div className="text-sm text-muted-foreground">
                  Thank you for your interest in volunteering with EDM. Your application has been received and we will review it shortly.
                </div>
                <div className="font-medium text-primary">Next Steps:</div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>We will review your application within 2-3 business days</li>
                  <li>You will receive a confirmation email shortly</li>
                  <li>Our team will contact you to discuss the next steps</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button 
              className="w-full sm:w-auto"
              onClick={() => {
                setShowSuccessDialog(false);
                router.push('/get-involved/volunteer');
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
