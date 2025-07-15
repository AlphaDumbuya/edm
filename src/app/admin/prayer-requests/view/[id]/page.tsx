"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { updatePrayerRequestAction, getPrayerRequestByIdAction } from '@/app/admin/prayer-requests/actions';
import dynamic from 'next/dynamic';
interface PrayerRequest {
  id: string;
  title: string;
  body: string;
  authorName?: string | null;
  authorEmail?: string | null;
  published: boolean;
  category?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Dynamically import ReactQuill with ssr: false
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default function ViewPrayerRequestPage() {
  const params = useParams();
  const requestId = params && params.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : undefined;

  const [prayerRequest, setPrayerRequest] = useState<PrayerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrayerRequest() {
      console.log('Request ID:', requestId); // Debug: log the requestId
      if (typeof requestId !== 'string') {
        setLoading(false); // Handle case where requestId is not a string
        return; // Exit if requestId is not a string
      }

      setLoading(true); // Set loading to true before fetching
      try {
        // Call the server action instead of the database function directly
        const result = await getPrayerRequestByIdAction(requestId);
        console.log('Fetch result:', result); // Debug: log the fetch result

        if (result.success && result.data) {
          setPrayerRequest(result.data);
        } else { // Handle the case where data is null/undefined for a string ID
          setError('Prayer request not found.');
        }
      } catch (err) {
        console.error('Error fetching prayer request:', err);
        setError('Failed to fetch prayer request.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchPrayerRequest();
  }, [requestId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (typeof requestId !== 'string') {
      console.error("Request ID is missing or invalid.");
      return;
    }

    try {
      const result = await updatePrayerRequestAction(requestId, formData);
      console.log('Update result:', result);
      if (result.success) {
        setSuccess('Prayer request updated successfully.');
        // Refresh the prayer request data
        const refreshed = await getPrayerRequestByIdAction(requestId);
        if (refreshed.success && refreshed.data) {
          setPrayerRequest(refreshed.data);
        }
      } else {
        setError(result.error || 'Failed to update prayer request.');
      }
    } catch (error) {
      console.error('Error updating prayer request:', error);
      setError('Failed to update prayer request.');
    }
  };

  useEffect(() => {
    if (success) {
      // Show the success message but keep the form and details visible
      // Optionally, auto-hide the message after a few seconds
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [success]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!prayerRequest) {
    return <div>Prayer request not found.</div>;
  }

  return (
    <div>
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <h1 className="text-2xl font-semibold mb-4">Prayer Request Details: {prayerRequest.id}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-medium">{prayerRequest.title}</h2>
        <ReactQuill
          value={prayerRequest.body}
          readOnly={true}
          theme="snow"
          className="text-gray-700"
        />
        {prayerRequest.authorName && <p><strong>By:</strong> {prayerRequest.authorName}</p>}
        {prayerRequest.authorEmail && <p><strong>Contact:</strong> {prayerRequest.authorEmail}</p>}
        <p><strong>Submitted:</strong> {prayerRequest.createdAt.toDateString()}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="published" className="block text-sm font-medium text-gray-700">Published:</label>
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={prayerRequest.published}
              onChange={(e) => setPrayerRequest({...prayerRequest, published: e.target.checked})}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={prayerRequest.category || ''}
              onChange={(e) => setPrayerRequest({...prayerRequest, category: e.target.value})}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Status
        </button>
      </form>
    </div>
  );
}