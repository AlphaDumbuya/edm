"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPrayerRequestById } from '@/lib/db/prayerRequests'; // Assuming the path to your data access file
import { updatePrayerRequestAction } from '@/app/admin/prayer-requests/actions';
import ReactQuill from 'react-quill';
interface PrayerRequest {
  id: string;
  title: string;
  body: string;
  authorName?: string | null;
  authorEmail?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ViewPrayerRequestPage() {
  const params = useParams();
  const requestId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [prayerRequest, setPrayerRequest] = useState<PrayerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('');

  
  useEffect(() => {
    async function fetchPrayerRequest() {
      if (typeof requestId !== 'string') {
        setLoading(false); // Handle case where requestId is not a string
        return; // Exit if requestId is not a string
      }

      setLoading(true); // Set loading to true before fetching
      try {
        const data = await getPrayerRequestById(requestId);
        if (data) {
          setPrayerRequest(data);
          setCurrentStatus(data.status);
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
      // Optionally set an error state or show a message to the user
      return;
    }

    try {
      const result = await updatePrayerRequestAction(requestId, formData);
      console.log('Update result:', result); // Handle the result as needed (e.g., show success/error)
    } catch (error) {
      console.error('Error updating prayer request:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

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
      <h1 className="text-2xl font-semibold mb-4">Prayer Request Details: {prayerRequest.id}</h1>

      <div className="mb-4">
        <h2 className="text-xl font-medium">{prayerRequest.title}</h2>
        {/* Replace p with ReactQuill */}
        <ReactQuill
          value={prayerRequest.body}
          readOnly={true} // Set read-only mode
          theme="snow" // Use the 'snow' theme or 'bubble'
          className="text-gray-700"
        />
        {prayerRequest.authorName && <p><strong>By:</strong> {prayerRequest.authorName}</p>}
        {prayerRequest.authorEmail && <p><strong>Contact:</strong> {prayerRequest.authorEmail}</p>}
        <p><strong>Submitted:</strong> {prayerRequest.createdAt.toDateString()}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            {/* Add other status options if needed */}
          </select>
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