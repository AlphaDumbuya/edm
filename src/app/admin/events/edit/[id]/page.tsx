"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getEventById } from "@/lib/db/events";
import { updateEventAction } from "@/app/admin/events/actions";
import { useRouter } from 'next/navigation';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
      await updateEventAction(eventId, formData);
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
    <div className="container mx-auto py-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Event: {eventId}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>{' '}
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={event.title}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>{' '}
          <ReactQuill
            value={description}
            onChange={setDescription}
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>{' '}
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={event.date ? new Date(event.date).toISOString().split('T')[0] : ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>{' '}
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={event.time}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>{' '}
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={event.location}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Event Image (optional)</label>
          <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Event Preview" className="w-full max-w-xs rounded shadow" />
              <p className="text-xs text-gray-500 mt-1">Event image preview</p>
            </div>
          )}
          <input type="hidden" name="imageUrl" value={imageUrl || ''} />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Event</button>
        <Link href="/admin/events">
          Back to Events
        </Link>
      </form>
    </div>
  );
}