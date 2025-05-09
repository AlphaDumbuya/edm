'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User, ShieldQuestion } from 'lucide-react';
import type { PrayerRequest } from '@/app/prayer/page';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PrayerRequestFormProps {
  onSubmit: (request: Omit<PrayerRequest, 'id' | 'timestamp'>) => void;
}

const prayerCategories = ["Healing", "Guidance", "Family", "Finances", "Protection", "Salvation", "Thanksgiving", "Missions", "Other"];


export default function PrayerRequestForm({ onSubmit }: PrayerRequestFormProps) {
  const [name, setName] = useState('');
  const [requestText, setRequestText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState('');
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
      requestText,
      isPublic,
      category: category || undefined,
    });
    setName('');
    setRequestText('');
    setIsPublic(true);
    setIsAnonymous(false);
    setCategory('');
    toast({
      title: "Prayer Request Submitted",
      description: "Your prayer request has been received. We are praying for you!",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-primary"><Send className="mr-2 h-6 w-6" /> Share Your Need</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name (Optional)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={isAnonymous}
                className="flex-grow"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                />
                <Label htmlFor="anonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                  <ShieldQuestion className="mr-1 h-4 w-4" /> Anonymous
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestText">Prayer Request</Label>
            <Textarea
              id="requestText"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Please write your prayer request here..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {prayerCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPublic"
              checked={isPublic}
              onCheckedChange={(checked) => setIsPublic(checked as boolean)}
            />
            <Label htmlFor="isPublic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Share this request publicly on the Prayer Wall (If unchecked, it will be kept private for our prayer team)
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full md:w-auto">
            <Send className="mr-2 h-4 w-4" /> Submit Prayer Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
