"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TipTapEditor from '@/components/TipTapEditor';
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
      <form action={handleAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-base font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3 min-h-[48px]"
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-base font-medium text-gray-700">
            Prayer Request Body
          </label>
          <TipTapEditor value={body} onContentChange={setBody} />
        </div>
        <div>
          <label htmlFor="authorName" className="block text-base font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3 min-h-[48px]"
          />
        </div>
        <div>
          <label htmlFor="authorEmail" className="block text-base font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="authorEmail"
            name="authorEmail"
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3 min-h-[48px]"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-md text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}