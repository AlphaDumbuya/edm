'use client';

import { useState, useEffect } from 'react';
import PrayerRequestForm from './prayer-request-form';
import PrayerRequestCard from './prayer-request-card';
import SectionTitle from '@/components/shared/section-title';
import { createPublicPrayerRequest } from '@/app/get-involved/prayer/actions'; // Import the createPublicPrayerRequest function
import { Separator } from '../ui/separator';
import type { PrayerRequestData } from '@/types/prayerRequest'; // Adjust path if necessary
import { useAuth } from '@/contexts/auth-context';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import DailyHighlight from './DailyHighlight';
import ScriptureOfTheWeek from './ScriptureOfTheWeek';
import TestimonialsSection from './TestimonialsSection';
import PrayerSearchFilter from './PrayerSearchFilter';
import GooglePrayerMap from './GooglePrayerMap';

const dummyLocations = [
  { lat: 8.484, lng: -13.234, label: 'Freetown, Sierra Leone' },
  { lat: 45.523, lng: -122.676, label: 'Portland, Oregon' },
];

const fetchTestimonials = async () => {
  const res = await fetch('/api/testimonials');
  if (!res.ok) return [];
  return res.json();
};

const submitTestimonial = async (name: string, message: string) => {
  const res = await fetch('/api/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message }),
  });
  return res.json();
};

interface PrayerClientProps {
  initialPrayerRequests: PrayerRequestData[];
}

const PrayerClient: React.FC<PrayerClientProps> = ({ initialPrayerRequests }) => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequestData[]>(initialPrayerRequests);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonyDialog, setTestimonyDialog] = useState(false);
  const [testimonyName, setTestimonyName] = useState('');
  const [testimonyMessage, setTestimonyMessage] = useState('');
  const [testimonyLoading, setTestimonyLoading] = useState(false);
  const [testimonySuccess, setTestimonySuccess] = useState(false);
  const [testimonyError, setTestimonyError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Highlighted request: pick the oldest for now
  const highlighted = prayerRequests.length > 0 ? prayerRequests[prayerRequests.length - 1] : null;

  // Filter/search logic
  const filteredRequests = prayerRequests.filter(r => {
    // Normalize category for filtering
    const reqCategory = (r.category || 'Other').toLowerCase();
    const filterCategory = (category || '').toLowerCase();
    const matchesCategory = !filterCategory || reqCategory === filterCategory;
    // Search in name, request, and category fields
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !searchLower ||
      (r.name?.toLowerCase().includes(searchLower) ||
        r.request?.toLowerCase().includes(searchLower) ||
        reqCategory.includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  const handlePrayerRequestSubmit = async (requestData: Omit<PrayerRequestData, 'id' | 'timestamp'> & { isPublic: boolean, requestText: string, name: string, email?: string | null | undefined }) => {
    // Cast requestData to any to access requestText, as the original PrayerRequest type might not have it
    const requestDataAny = requestData as any;
    try {
      // Explicitly type the payload to ensure 'isPublic' is included
      const prayerRequestPayload: {
        request: string;
        authorName?: string | null | undefined;
        authorEmail?: string | null | undefined;
        isPublic?: boolean;
        category?: string | null;
      } = {
        request: requestDataAny.request, // Use 'request' instead of 'requestText'
        authorName: requestDataAny.name, // Map name to authorName
        authorEmail: requestDataAny.email, // Map email to authorEmail
        isPublic: requestDataAny.isPublic, // Include isPublic
        category: requestDataAny.category || undefined, // Pass category
      };
      const newRequest = await createPublicPrayerRequest(prayerRequestPayload);
      // Add the new request to the local state for immediate UI update
      setPrayerRequests(prev => [
        {
          id: newRequest.id,
          request: newRequest.body,
          name: newRequest.authorName || '',
          email: newRequest.authorEmail || '',
          status: 'Public',
          isPublic: true,
          createdAt: new Date(newRequest.createdAt),
          updatedAt: new Date(newRequest.updatedAt),
          formattedFullDate: '', // You may want to format this as needed
        },
        ...prev,
      ]);
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      // Handle error (e.g., show error toast)
    }
  };

  useEffect(() => {
    fetchTestimonials().then(setTestimonials);
  }, []);

  const handleTestimonySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonyLoading(true);
    setTestimonyError(null);
    try {
      const res = await submitTestimonial(testimonyName, testimonyMessage);
      if (!res.success) throw new Error(res.error || 'Failed to submit.');
      setTestimonySuccess(true);
      setTestimonyName('');
      setTestimonyMessage('');
      setTestimonyDialog(false);
      fetchTestimonials().then(setTestimonials);
    } catch (err: any) {
      setTestimonyError(err.message || 'Failed to submit.');
    } finally {
      setTestimonyLoading(false);
    }
  };

  // Reset visibleCount when search or filter changes
  useEffect(() => {
    setVisibleCount(3);
  }, [search, category, prayerRequests]);

  return (
    <div className="space-y-12">
      <ScriptureOfTheWeek />
      <DailyHighlight request={highlighted} />
      <SectionTitle title="Submit Your Prayer Request" />
      <p className="text-muted-foreground">We are here to pray with you and for you.</p>
      {loading ? (
        <p>Loading authentication status...</p>
      ) : user ? (
        <>
          {!showForm ? (
            <div className="flex flex-col items-center gap-4 my-6">
              <div className="mb-2 text-sm text-muted-foreground">Dear {user.name || user.email}, your request will be posted under your name.</div>
              <Button onClick={() => setShowForm(true)} size="lg">Submit Your Prayer Request</Button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">Dear {user.name || user.email}, your request will be posted under your name.</div>
              <PrayerRequestForm onSubmit={handlePrayerRequestSubmit as any} />
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 my-6">
          <div className="text-center text-red-600 font-medium">You must be registered and logged in to submit a prayer request.</div>
          <div className="flex gap-2">
            <Button onClick={() => router.push('/auth/signup')}>Register</Button>
            <Button variant="outline" onClick={() => router.push('/auth/login')}>Login</Button>
          </div>
        </div>
      )}
      <Separator className="my-8" />
      <SectionTitle title="Community Prayer Wall" />
      <PrayerSearchFilter onSearch={setSearch} />
      <p className="text-muted-foreground">Lifting up needs together in faith for Sierra Leone, Oregon, and beyond.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.slice(0, visibleCount).map(request => (
            <PrayerRequestCard key={request.id} request={request} />
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">No public prayer requests found yet.</p>
        )}
      </div>
      {visibleCount < filteredRequests.length && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => setVisibleCount(v => v + 3)} variant="outline">
            See More
          </Button>
        </div>
      )}
      {/* Map and Testimonials now stacked for better responsiveness */}
      <div className="my-8">
        <GooglePrayerMap locations={dummyLocations} />
      </div>
      <div className="my-8">
        <TestimonialsSection
          testimonials={testimonials}
          onCreateTestimony={() => setTestimonyDialog(true)}
        />
      </div>
      {/* Testimony Dialog */}
      {testimonyDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form onSubmit={handleTestimonySubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-2">Share Your Answered Prayer</h2>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Your Name"
              value={testimonyName}
              onChange={e => setTestimonyName(e.target.value)}
              required
            />
            <textarea
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Your Testimony"
              value={testimonyMessage}
              onChange={e => setTestimonyMessage(e.target.value)}
              rows={4}
              required
            />
            {testimonyError && <div className="text-red-600 text-sm mb-2">{testimonyError}</div>}
            {testimonySuccess && <div className="text-green-600 text-sm mb-2">Thank you! Your testimony will appear after review.</div>}
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 rounded border" onClick={() => setTestimonyDialog(false)} disabled={testimonyLoading}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white" disabled={testimonyLoading}>{testimonyLoading ? 'Submitting...' : 'Submit'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PrayerClient;