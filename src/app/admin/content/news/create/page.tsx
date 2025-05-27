'use client';

import { createNewsArticleAction } from '../actions';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreateNewsArticlePage() {

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Create New News Article</h1>
      <form action={async (formData: FormData) => { await createNewsArticleAction(formData); router.push('/admin/content/news'); }} className="space-y-6">
        {/* Form elements will be added here */}
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
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary-dark"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Image (max 4MB)</p>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1">
            <ReactQuill
              id="content"
              className="h-64" // Adjust height as needed
              // You'll likely need to add state management for the content here
            />
          </div>
        </div>
      </form>
    </div>
  );
}