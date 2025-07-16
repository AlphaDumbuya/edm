'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User, ShieldQuestion } from 'lucide-react';
import type { PrayerRequestData } from '@/types/prayerRequest';
import { useToast } from "@/hooks/use-toast";

interface PrayerRequestFormProps {
  onSubmit: (request: Omit<PrayerRequestData, 'id' | 'createdAt' | 'updatedAt' | 'formattedFullDate'>) => void;
}

export default function PrayerRequestForm({ onSubmit }: PrayerRequestFormProps) {
  const [email, setEmail] = useState(''); // Add state for email
  const [name, setName] = useState('');
  const [requestText, setRequestText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) {
      toast({
        title: "Error",
        description: "Prayer request text cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    onSubmit({
      name: isAnonymous || !name.trim() ? 'Anonymous' : name,
      request: requestText,
      isPublic,
      email, // Use 'email' key to match PrayerRequestData
    });
    setName('');
    setRequestText('');
    setIsPublic(true);
    setIsAnonymous(false);
    setEmail('');
    toast({
      title: "Prayer Request Submitted",
      description: "Your prayer request has been received. We are praying for you!",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center text-primary text-lg sm:text-xl"><Send className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Share Your Need</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base">Your Name (Optional)</Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={isAnonymous}
                className="flex-grow text-sm sm:text-base"
              />
              <div className="flex items-center space-x-2 pt-2 sm:pt-0">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                />
                <Label htmlFor="anonymous" className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                  <ShieldQuestion className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Anonymous
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestText" className="text-sm sm:text-base">Prayer Request</Label>
            <Textarea
              id="requestText"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Please write your prayer request here..."
              rows={5}
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="text-sm sm:text-base"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="isPublic"
              checked={isPublic}
              onCheckedChange={(checked) => setIsPublic(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="isPublic" className="text-xs sm:text-sm font-normal leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Share this request publicly on the Prayer Wall (If unchecked, it will be kept private for our prayer team)
            </Label>
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6">
          <Button type="submit" className="w-full sm:w-auto text-sm sm:text-base">
            <Send className="mr-2 h-4 w-4" /> Submit Prayer Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

