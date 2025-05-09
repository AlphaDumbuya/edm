import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LeaderProfileProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  dataAiHint?: string;
  contact?: string;
}

export default function LeaderProfile({ name, role, bio, imageUrl, dataAiHint, contact }: LeaderProfileProps) {
  return (
    <Card className="flex flex-col md:flex-row items-start gap-6 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Avatar className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-primary shadow-md">
        <AvatarImage src={imageUrl} alt={name} data-ai-hint={dataAiHint} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-2xl text-primary">{name}</CardTitle>
          <CardDescription className="text-md font-semibold text-foreground">{role}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-muted-foreground mb-4 text-sm">{bio}</p>
          {contact && (
            <div className="flex items-center text-sm text-primary hover:underline">
              <Mail className="mr-2 h-4 w-4" />
              <a href={`mailto:${contact}`}>{contact}</a>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
