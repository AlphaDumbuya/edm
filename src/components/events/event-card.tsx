'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, UserPlus, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Event as DBEvent } from '@prisma/client';

// Define the event type with nullable fields for component props
interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    imageUrl: string | null;
    isVirtual: boolean;
    onlineLink: string | null;
    cancelled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, event }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to register for event');
      }
      toast({
        title: "Registration Successful! ✨",
        description: `You've been registered for "${event.title}". A confirmation email has been sent to ${email} with all the details.`,
        duration: 5000,
      });
      setIsDialogOpen(false);
      setName('');
      setEmail('');
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err instanceof Error ? err.message : "There was a problem registering for the event. Please try again.",
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  if (!event) return null;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full h-48 sm:h-56 bg-gray-100">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
        )}
      </div>

      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="text-lg sm:text-xl line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground flex items-center mt-1">
          <CalendarDays className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary" /> {new Date(event.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
        </CardDescription>
        {event.isVirtual ? (
          <CardDescription className="text-xs sm:text-sm text-blue-700 flex items-center mt-1">
            <span className="mr-2">Online</span>
          </CardDescription>
        ) : (
          <CardDescription className="text-xs sm:text-sm text-muted-foreground flex items-center mt-1">
            <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary" /> {event.location}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow">
        <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3" dangerouslySetInnerHTML={{ __html: event.description || 'No description provided.' }} />
      </CardContent>
      <CardFooter className="p-3 sm:p-4 border-t">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full text-xs sm:text-sm">
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up / Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card">
            <DialogHeader>
              <DialogTitle className="text-primary flex items-center text-lg sm:text-xl">
                <Info className="mr-2 h-5 w-5" /> {event.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                {new Date(event.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                {event.isVirtual ? (
                  <>
                    <br />
                    <span className="text-blue-700 font-semibold">Online</span>
                  </>
                ) : (
                  <> @ {event.location}</>
                )}
              </DialogDescription>
              <div className="mt-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: event.description || '' }} />
            </DialogHeader>
            <form onSubmit={handleSignup}>
              <div className="grid gap-3 py-3 sm:gap-4 sm:py-4">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Register for this event:</h3>
                <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="name" className="text-right text-muted-foreground text-xs sm:text-sm">
                    Name
                  </Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 text-xs sm:text-sm h-8 sm:h-9" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="email" className="text-right text-muted-foreground text-xs sm:text-sm">
                    Email
                  </Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3 text-xs sm:text-sm h-8 sm:h-9" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Sign Up</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
