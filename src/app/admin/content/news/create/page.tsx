'use client';

import { createNewsArticleAction } from '../actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function CreateNewsArticlePage() {
 const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
      <form action={async (formData: FormData) => { await createNewsArticleAction(formData); router.push('/admin/content/news'); }} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700"> 
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700"> 
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700"> 
            Content
          </label>
          <ReactQuill
            id="content"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
 // Add state management for content
 />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Published
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Create News Article
          </button>
        </div>
      </form>
    </div>
  );
}