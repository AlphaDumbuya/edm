import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, CalendarDays, Tag, Heart } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { PrayerRequestData } from '@/types/prayerRequest';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { useAuth } from '@/contexts/auth-context';

interface PrayerRequestCardProps {
  request: PrayerRequestData;
}

export default function PrayerRequestCard({ request }: PrayerRequestCardProps) {
  const validCreatedAt = request.createdAt instanceof Date && !isNaN(request.createdAt.getTime());

  // Always render absolute date string for SSR
  const fullDate = validCreatedAt
    ? format(request.createdAt, 'MMMM d, yyyy \'at\' h:mm a')
    : 'Invalid date';

  // --- Hydration-safe time ago logic ---
  const [timeAgo, setTimeAgo] = useState<string | null>(null);
  useEffect(() => {
    if (validCreatedAt) {
      setTimeAgo(formatDistanceToNow(request.createdAt, { addSuffix: true }));
    }
  }, [request.createdAt, validCreatedAt]);

  // --- Pray for this logic ---
  const [prayed, setPrayed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [prayerText, setPrayerText] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function checkPrayed() {
      try {
        const res = await fetch(`/api/prayerRequests/hasPrayed?requestId=${request.id}`);
        const data = await res.json();
        setPrayed(!!data.prayed);
      } catch {
        // fallback to localStorage if API fails
        if (typeof window !== 'undefined') {
          const prayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '[]');
          setPrayed(prayedRequests.includes(request.id));
        }
      }
    }
    checkPrayed();
  }, [request.id]);

  const handlePray = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setPrayerText('');
    setError(null);
    setSuccess(false);
  };

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/prayerRequests/pray', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: request.email,
          recipientName: request.name,
          prayerText,
          prayerRequestId: request.id,
          prayedByUserId: user?.id || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send prayer.');
      }
      // Mark as prayed in localStorage
      if (typeof window !== 'undefined') {
        const prayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '[]');
        if (!prayedRequests.includes(request.id)) {
          prayedRequests.push(request.id);
          localStorage.setItem('prayedRequests', JSON.stringify(prayedRequests));
        }
      }
      setSuccess(true);
      setPrayed(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send prayer.');
    } finally {
      setSending(false);
    }
  };

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
          <CalendarDays className="mr-1 h-3 w-3" /> {timeAgo || fullDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-foreground whitespace-pre-wrap">{request.request}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3">
        {!prayed ? (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 w-full" onClick={() => {
                if (prayed) {
                  setError('Someone has already prayed for this request.');
                  setShowDialog(true);
                } else {
                  setShowDialog(true);
                }
              }}>
                <Heart className="mr-2 h-4 w-4" /> Pray for this
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a Prayer</DialogTitle>
                <DialogDescription>
                  Your prayer will be sent to <b>{request.name}</b> at <b>{request.email}</b>.
                </DialogDescription>
              </DialogHeader>
              {prayed ? (
                <div className="text-yellow-600 text-sm font-semibold">Someone has already prayed for this request.</div>
              ) : (
                <form onSubmit={handlePrayerSubmit} className="space-y-4">
                  <Textarea
                    value={prayerText}
                    onChange={e => setPrayerText(e.target.value)}
                    placeholder="Write your prayer here..."
                    rows={5}
                    required
                    className="w-full"
                    disabled={sending || success}
                  />
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  {success && <div className="text-green-600 text-sm">Your prayer was sent successfully!</div>}
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleDialogClose} disabled={sending}>Cancel</Button>
                    <Button type="submit" disabled={sending || success}>
                      {sending ? 'Sending...' : 'Send Prayer'}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        ) : (
          <span className="text-green-600 font-semibold w-full text-center block">This request has been prayed for</span>
        )}
      </CardFooter>
    </Card>
  );
}
