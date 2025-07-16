"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getEventById } from "@/lib/db/events";
import { updateEventAction } from "@/app/admin/events/actions";
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic';
// Dynamically import ReactQuill with ssr: false
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '/public/quill.snow.css';
import { UploadButton } from "@/components/shared/UploadButton";

// Define a type for the PageProps to match Next.js expected type
interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const eventId = params.id;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(event?.imageUrl || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const fetchedEvent = await getEventById(eventId);
        if (fetchedEvent) {
          setEvent(fetchedEvent);
          setDescription(fetchedEvent.description);
          setImageUrl(fetchedEvent.imageUrl || null);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set('description', description); // Use content from ReactQuill state
    formData.set('imageUrl', imageUrl || '');
    try {
      // TODO: Replace 'userId' with the actual user ID from your authentication/session context
      await updateEventAction(eventId, formData, "userId");
      router.push('/admin/events');
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle error, e.g., show a message to the user
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-4 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col min-h-0 bg-background h-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center">Edit Event: {eventId}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full flex-1 min-h-0 overflow-y-auto" encType="multipart/form-data">
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Event Image (optional)</label>
          <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
          {imageUrl && (
            <div className="mt-2 flex flex-col items-center">
              <img src={imageUrl} alt="Event Preview" className="w-full max-w-xs rounded shadow object-cover aspect-video" />
              <p className="text-xs text-gray-500 mt-1">Event image preview</p>
            </div>
          )}
          <input type="hidden" name="imageUrl" value={imageUrl || ''} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={event.title}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={event.location}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={event.date ? new Date(event.date).toISOString().split('T')[0] : ''}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500 input-white-icons"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              defaultValue={event.time}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500 input-white-icons"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="bg-white border border-gray-300 rounded-md min-h-[120px] sm:min-h-[180px] max-h-[32vh] overflow-y-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button type="submit" className="w-full sm:w-auto py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors text-base sm:text-lg">Update Event</button>
          <Link href="/admin/events" className="w-full sm:w-auto py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-300 transition-colors text-base sm:text-lg text-center flex items-center justify-center">Back to Events</Link>
        </div>
      </form>
    </div>
  );
}