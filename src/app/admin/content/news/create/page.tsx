'use client';

import { createNewsArticleAction } from '../actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../../../api/uploadthing/core";
export default function CreateNewsArticlePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store image URL

  const editor = useEditor({
    extensions: [StarterKit],
    content: '', // Empty initial content for create page
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Update state with HTML content
    },
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Create New News Article</h1>
      <form
        action={async (formData: FormData) => {
          formData.append('content', content);
          if (imageUrl) {
            formData.append('imageUrl', imageUrl); // Append imageUrl to formData
          }
          const result = await createNewsArticleAction(formData);
          if (result && result.success) {
            router.push('/admin/content/news');
          }
        }}
        className="space-y-6"
      >
        {/* Form elements will be added here */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
            name="title"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
            name="slug"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <div className="mt-1 border border-dashed border-gray-300 rounded-md p-6 text-center">
            {/* Placeholder for icon - you can replace with an actual icon */}
            <div className="mx-auto h-12 w-12 text-gray-400" >
             {/* Example SVG placeholder (replace with an actual icon component if available) */}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
            </svg>
            </div>
            <p className="mt-2 text-sm text-gray-500">No image uploaded</p>
            <label htmlFor="coverImage" className="mt-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
              Choose File
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:mr-4 file:py-2 file:px-4
                hidden" // Hide the default file input
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Image (max 4MB)</p>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1 border rounded-md shadow-sm"> {/* Added border and shadow for professional look */}
            {/* Render the Editor component only if the editor is loaded */}
            {editor ? (
              <EditorContent editor={editor} className="prose max-w-none" />
            ) : (
              <div>Loading editor...</div>
            )}
          </div>
        </div>
        {/* Render the Editor component only on the client side */}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Published
          </label>
        </div>
        <div> {/* Add onClick handler to the div containing the button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create News Article
          </button>
        </div>
      </form>
    </div>
  );
}