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
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-xl bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-800">
        <div className="mb-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/admin/prayer-requests')}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700 font-medium shadow transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Prayer Requests
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-6 text-gray-100">Submit New Prayer Request</h1>
        <form action={handleAction} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-base font-medium text-gray-200 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3 min-h-[48px] placeholder-gray-400"
              placeholder="Enter a title for your prayer request"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-base font-semibold text-gray-200 mb-1">
              Prayer Request Body
            </label>
            <p className="text-sm text-gray-400 mb-2">Please provide the details of your prayer request. You can use formatting, headings, and lists for clarity.</p>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl shadow-inner p-4">
              <TipTapEditor value={body} onContentChange={setBody} />
            </div>
          </div>
          <div>
            <label htmlFor="authorName" className="block text-base font-medium text-gray-200 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              required
              className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3 min-h-[48px] placeholder-gray-400"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="authorEmail" className="block text-base font-medium text-gray-200 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              required
              className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base px-4 py-3 min-h-[48px] placeholder-gray-400"
              placeholder="Enter your email address"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex justify-center w-full sm:w-auto py-3 px-6 border border-indigo-600 shadow-md text-base font-semibold rounded-lg text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}