import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, CalendarDays, Tag, Heart } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface PrayerRequestCardProps {
  request: PrayerRequest;
}

type PrayerRequest = any //TODO: Add prayer request type definition
export default function PrayerRequestCard({ request }: PrayerRequestCardProps) {
  const timeAgo = formatDistanceToNow(new Date(request.timestamp), { addSuffix: true });
  const fullDate = format(new Date(request.timestamp), 'MMMM d, yyyy \'at\' h:mm a');

  return (
    <Card className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 h-full bg-background">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-primary flex items-center">
            <UserCircle className="mr-2 h-5 w-5" /> {request.name}
          </CardTitle>
          {request.category && <Badge variant="secondary">{request.category}</Badge>}
        </div>
        <CardDescription className="text-xs text-muted-foreground flex items-center pt-1" title={fullDate}>
          <CalendarDays className="mr-1 h-3 w-3" /> {timeAgo}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-foreground whitespace-pre-wrap">{request.requestText}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3">
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 w-full">
          <Heart className="mr-2 h-4 w-4" /> Praying for this
        </Button>
      </CardFooter>
    </Card>
  );
}
