
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
import { Event } from '@prisma/client';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for signup logic
    console.log(`Signing up ${name} (${email}) for ${event.title}`);
    toast({
      title: "Signup Successful!",
      description: `You've been registered for ${event.title}.`,
    });
    setIsDialogOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"

 data-ai-hint={event.dataAiHint}
        />
      </div>
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="text-lg sm:text-xl line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground flex items-center mt-1">
          <CalendarDays className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary" /> {event.date}
        </CardDescription>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground flex items-center mt-1">
          <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary" /> {event.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 border-t">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full text-xs sm:text-sm">
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up / Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card">
            <DialogHeader>
              <DialogTitle className="text-primary flex items-center text-lg sm:text-xl">
                <Info className="mr-2 h-5 w-5" /> {event.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                <div className="mt-2 text-muted-foreground"><CalendarDays className="inline mr-1 h-4 w-4" /> {event.date}</div>
                <div className="text-muted-foreground"><MapPin className="inline mr-1 h-4 w-4" /> {event.location}</div>
                <div className="mt-4">{event.description}</div>
              </DialogDescription>
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
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} size="sm">Cancel</Button>
                <Button type="submit" size="sm">Sign Up</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
