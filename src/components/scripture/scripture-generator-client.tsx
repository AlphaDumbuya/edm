'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { scriptureMessageGenerator, type ScriptureMessageGeneratorOutput } from '@/ai/flows/scripture-message-generator';
import { Loader2, Wand2, BookMarked, Sparkles } from 'lucide-react'; // Added Sparkles here
import { useToast } from '@/hooks/use-toast';

export default function ScriptureGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScriptureMessageGeneratorOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate a scripture message.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const output = await scriptureMessageGenerator({ topic });
      setResult(output);
    } catch (error) {
      console.error("Error generating scripture message:", error);
      toast({
        title: "Error",
        description: "Failed to generate scripture message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-primary"><Wand2 className="mr-2 h-6 w-6" />Enter a Topic</CardTitle>
          <CardDescription>
            Receive an encouraging scripture message tailored to your chosen theme (e.g., hope, love, forgiveness).
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Strength in adversity"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Message
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result && (
        <Card className="mt-8 shadow-lg animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="flex items-center text-primary"><BookMarked className="mr-2 h-6 w-6" />Generated Scripture Message</CardTitle>
            <CardDescription>For topic: "{topic}"</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Message:</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.message}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Verse(s):</h3>
              <p className="text-muted-foreground font-medium">{result.verse}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
