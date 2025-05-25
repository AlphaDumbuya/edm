"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { createPrayerRequestAction } from '../actions';

export default function CreatePrayerRequestPage() {
  const router = useRouter();
  const [body, setBody] = useState('');
  const handleAction = async (formData: FormData) => {
 formData.append('body', body); // Append editor content to form data
    await createPrayerRequestAction(formData);
    router.push('/admin/prayer-requests');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Submit New Prayer Request</h1>
      <form action={handleAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            name="title"
            required
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
 Prayer Request Body
          </label>
 <ReactQuill
            id="body"
 value={body}
 onChange={setBody}
 />
        </div>
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="authorName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            name="authorName"
          />
        </div>
        <div>
          <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700">
            Your Email (Optional)
          </label>
          <input
            type="email"
            id="authorEmail"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            name="authorEmail"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}